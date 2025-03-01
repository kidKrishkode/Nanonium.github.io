const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const querystring = require('querystring');
const ejs = require('ejs');
const jsonfile = require('jsonfile');
let varchar, security, hex, compiler;
try{
    varchar = require('./config/env-variables');
    security = require('./config/security');
    hex = require('./config/hex');
    compiler = require('./config/compiler');
}catch(e){
    varchar = require('./config/env-variables.ts');
    security = require('./config/security.ts');
    hex = require('./config/hex.ts');
    compiler = require('./config/compiler.ts');
}
require('./public/App.test.js');
require('dotenv').config();

class WEB{
    constructor(port){
        this.active = true;
        this.port = port;
        this.filename = path.basename(__filename);
        this.appInfo = jsonfile.readFileSync('./public/manifest.json');
    }
}

const app = express();
let server = http.createServer(app);
const PORT = process.env.PORT || 443;
const AppName = "Nanonium";
let web = new WEB(PORT);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/config',express.static(path.join(__dirname,'config')));
app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/public',express.static(path.join(__dirname,'public')));

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use((req, res, next) => {
    try{
        const url = req.originalUrl;
        const query = url.split('?')[1];
        const baseURL = req.protocol + '://' + req.get('host');
        const params = new URL(url, baseURL).searchParams;
        const public_key = varchar.duplex;
        if(params.has('encode')){
            if(query!=undefined){
                const decodedUrl = security.decodedURI(query.replace('encode=',''), public_key);
                req.url = `${url.split('?')[0]}?${decodedUrl}`;
                req.query = querystring.parse(decodedUrl);
            }
        }else{
            if(query!=undefined){
                const encodedUrl = security.encodedURI(query, public_key);
                req.url = `${url}?encode=${encodedUrl}`;
                req.query = querystring.parse(encodedUrl);
            }
        }
        const my_browser = security.browser(req.headers);
        if(!security.validBrowser([my_browser[0], my_browser[1].split('.')[0]*1], varchar.browser_data) && hex.isHosted(req)){
            res.status(422).render('notfound',{error: 422, message: "Your browser is outdated and may not support certain features. Please upgrade to a modern browser."});
        }
        try{
            let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress || null;
            if(ip.includes('::ffff:')){
                ip = ip.split('::ffff:')[1];
            }
            if(ip=='::1'){
                ip = "127.0.0.1:"+PORT;
            }
            req.userIp = ip;
        }catch(e){
            console.log("Error to execute IP traker!");
        }
        next();
    }catch(e){
        res.status(401).render('notfound',{error: 401, message: "Unauthorize entry not allow, check the source or report it"});
    }
});

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/index', (req, res) => {
    res.redirect('/');
});

app.get('/varchar', async (req, res) => {
    const navi = req.headers;
    res.status(200).json({varchar, navi, error_log: web.appInfo['error_log'], security: {
        encodedData: security.encodedData.toString(),
        decodedData: security.decodedData.toString()
    }, ip: req.userIp});
});

app.get('/compiler', async (req, res) => {
    try{
        const codefork = await jsonfile.readFile('./config/codefork.json');
        res.status(200).json({
            compiler: {
                updateLineNumbers: compiler.updateLineNumbers.toString(),
                ideDeploy: compiler.ideDeploy.toString(),
                sqlCompiler: compiler.sqlCompiler.toString(),
                green_highlighter: compiler.green_highlighter,
                blue_highlighter: compiler.blue_highlighter,
                purple_highlighter: compiler.purple_highlighter,
                orange_highlighter: compiler.orange_highlighter,
                string_highlighter: compiler.string_highlighter
            }
        });
    }catch(error){
        res.status(500).json({ error: 'Failed to load configuration', details: error.message });
    }
});

app.get('/privacy', (req, res) => {
    const promises = [
        ejs.renderFile('./views/privacyPolicy.ejs', {
            id: req.query.view==undefined?0:req.query.view,
            AppName, 
            update: (new Date().toDateString()).substring(4,8)+(new Date().toDateString()).substring(11,16),
            contact: web.appInfo.contact,
            developer: web.appInfo.developer,
            view: req.query.view==undefined?0:req.query.view,
            license: req.query.view==2?fs.readFileSync(path.join(__dirname,'LICENSE')).toString():''
        }),
    ];
    Promise.all(promises).then(([privacy]) => {
        res.status(200).json({privacy});
    });
});

app.get('/terms', (req, res) => {
    res.redirect('/privacy?encode=v65w2*y');
});

app.get('/license', (req, res) => {
    res.redirect('/privacy?encode=v65w2*x');
});

app.post('/userInfo', (req, res) => {
    const userAgent = req.body.userAgent;
    res.status(200).render('userInfo', {
        ip: req.userIp, 
        browser: security.browser(req.headers),
        deviceVison: hex.deviceVision(userAgent)
    });
});

app.get('/dumeSection', (req, res) => {
    res.status(200).render('dumeSection');
});

app.get('/sideNav', (req, res) => {
    res.status(200).render('sideNav');
});

app.get('/docs', (req, res) => {
    res.status(200).render('docs');
});

WEB.prototype.noise_detect = function(data){
    try{
        return hex.pyerrorscanner(data);
    }catch(e){
        console.log("Error found to detect noise\n",e);
    }
}
WEB.prototype.handle_error = function(res, code){
    try{
        const error_log = web.appInfo['error_log'];
        const error = hex.pyerrorinfo(error_log, code);
        res.status(200).json({error});
        return;
    }catch(e){
        console.log("Error found to handle error\n",e);
    }
}

function callPythonProcess(list, functionValue){
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./model/main.py', list, functionValue]);
        let resultData = '';
        pythonProcess.stdout.on('data', (data) => {
            resultData += data.toString();
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        pythonProcess.on('close', (code) => {
            if(code !== 0){
                console.log(`Python script exited with code ${code}`);
            }
            try{
                const result = JSON.parse(resultData);
                resolve(result);
            }catch(error){
                console.error(`Error parsing JSON: ${error.message}`);
                reject(new Error("Error parsing JSON from Python script"));
            }
        });
    });
}

app.get('*', (req, res) => {
    res.status(404).render('notfound',{error: 404, message: "Page not found on this url, check the source or report it"});
});

server.listen(PORT, (err) => {
    if(err) console.log("Oops an error occure:  "+err);
    console.log(`Compiled successfully!\n\nYou can now view \x1b[33m./${path.basename(__filename)}\x1b[0m in the browser.`);
    console.info(`\thttp://localhost:${PORT}`);
    console.log("\n\x1b[32mNode web compiled!\x1b[0m \n");
});
