let nav = 0;
let theme = 0;
let system;
let loader;
let config;
let compiler;
let temp;
let local_memory=[];
let db, memory;
let themeSet = [];
let security;

class System{
    constructor(){
        try{
            this.listen = window.location;
            this.navigation = window.navigation;
            this.error_layout = false;
        }catch(e){
            alert("System not deployed!\n\n",e);
        }
    }
}
class Loader{
    constructor(load){
        this.loaded = load;
    }
}
class MEMORY{
    constructor(){
        this.dbName = 'Nanonium';
        this.dbVersion = 1;
    }
}
class TAB{
    constructor(){
        this.opened = false;
    }
}
class Security{
    constructor(){
        this.vitals = 0;
        this.trial = 3;
        this.getCaptcha = '';
    }
}
document.addEventListener("DOMContentLoaded",() => {
    loader = new Loader(true);
    loader.creat();
    // loader.remove(3000);
    system = new System();
    // memory = new MEMORY();
    system.setUp();
    security = new Security();
    // window.addEventListener("load", system.isOnline);
});
function navbar_toggle(){
    if(nav==0){
        document.getElementById('side-menu').style.display = "block";
        document.body.style.overflowY = "hidden";
        nav++;
        const nl1 = document.body.addEventListener('scroll', (e)=>{
            e.preventDefault();
            navbar_toggle();
            document.body.removeEventListener(nl1);
        });
    }else{
        document.getElementById('side-menu').style.display = "none";
        document.body.style.overflowY = "auto";
        nav--;
    }
}
Loader.prototype.creat = function(){
    if(loader.loaded!=false){
        const loaderEle = document.createElement('section');
        loaderEle.classList.add("loading");
        loaderEle.innerHTML = `<div class="loader"></div><div class="loader reversloder"></div><div class="loaderhead">Nanonium</div>`;
        document.body.appendChild(loaderEle);
        document.body.style.overflowY = "hidden";
    }
}
Loader.prototype.remove = function(time){
    if(time<100){
        return false;
    }
    setTimeout(()=>{
        document.body.removeChild(document.querySelector('.loading'));
        loader.loaded = false;
        document.body.style.overflowY = "scroll";
    },time);
}
TAB.prototype.open = function(){
    const tabEle = document.createElement('div');
    tabEle.classList.add("tabPage");
    document.body.appendChild(tabEle);
    TAB.opened = true;
    document.querySelectorAll('.tabPage')[document.querySelectorAll('.tabPage').length-1].classList.add('blbg');
}
TAB.prototype.close = function(){
    document.body.removeChild(document.querySelectorAll('.tabPage')[document.querySelectorAll('.tabPage').length-1]);
    if (document.querySelectorAll('.tabPage').length-1 >= 1) TAB.opened = false;
}
TAB.prototype.closeAll = function(){
    document.body.removeChild(document.querySelector('.tabPage'));
    TAB.opened = false;
}
TAB.prototype.innerContext = function(title, innerContext){
    try{
        document.querySelector('.tabPage').innerHTML = config.varchar.info_templet.replace("<|title|>", title);
        document.querySelector('.modal-body').innerHTML = innerContext;

    }catch(e){
        console.error(e);
    }
}
TAB.prototype.mute = function(){
    try{
        const spanToRemove = document.querySelector('.errorView .flx span');
        if(spanToRemove){
            spanToRemove.remove();
        }
    }catch(e){
        console.error(e);
    }
}
System.prototype.setUp = function(){
    try{
        fetch('/varchar').then(response => response.json()).then(data => {
            config = data.valueOf();
            themeSet = config.varchar.themeSet;
        }).catch(error =>{
            console.error('Error: ',error);
        });
        setTimeout(()=>{
            system.setTheme();
        },1000);
        // system.compilerSetUp();
    }catch(e){
        console.log("Error to set up initials!\n",e);
    }
}
System.prototype.navbar_toggle = function(){
    if(nav==0){
        if(document.querySelector('#v-pills-tab')==null){
            fetch('/sideNav').then(response => response.text()
            ).then(data => 
                document.body.innerHTML += data
            ).catch(error => console.error('Error: ',error));
        }
        setTimeout(()=>{
            document.querySelector('.blbg').style.display = "block";
            document.getElementById('v-pills-tab').style.display = "block";
            document.body.style.overflowY = "hidden";
            nav++;
        },1000);
    }else{
        document.getElementById('v-pills-tab').style.display = "none";
        document.body.style.overflowY = "auto";
        document.querySelector('.blbg').style.display = "none";
        nav--;
    }
}
System.prototype.deviceVision = function(){
    const userAgent = navigator.userAgent;
    const isComputer = /Windows|Macintosh|Linux/i.test(userAgent) && !/Mobile/i.test(userAgent);
    const isMobile = /Android|iPhone|iPad|iPod|Kindle|BlackBerry/i.test(userAgent);
    const isMobileDesktop = /Android|iPhone|iPad|iPod/i.test(userAgent) && /Chrome|Safari|Firefox/i.test(userAgent) && !/Mobile/i.test(userAgent);
    return {
        isComputer,
        isMobile,
        isMobileDesktop
    };
}
System.prototype.getUserLocation = function(){
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
            }, error => {
                reject(error);
            });
        }else{
            reject(new Error("Geolocation is not supported by this browser. Try another one!"));
        }
    });
}
System.prototype.impexpTab = function(){
    let tab = new TAB();
    tab.open();
    tab.innerContext("Import/Export chat", config.varchar.chat_impexp);
    const input = document.getElementById("file-input");
    input.addEventListener("change", async (e) => {
        const file = e.target.files[0]; 
        document.getElementById("file-name").value = `${e.target.files[0].name} (${(e.target.files[0].size/1000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}kb)`;
        const text = await file.text();
        try{
          JSON.parse(text);
        }catch(e){
            console.info("oops");
        }
    });
}
System.prototype.swtcmodl = function(){
    let tab = new TAB();
    tab.open();
    tab.innerContext("Change model type", config.varchar.model_switch);
}
function route(link){
    window.location = link;
}
function invaild(){
    alert("Sorry, this feature not avalible in this version,\nTry another one!...");
}
System.prototype.copyCode = function(id){
    const textToCopy = document.querySelector(id);
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = textToCopy.textContent;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("Code has been copied to the clipboard!");
}
System.prototype.downloadCode = function(id,name){
    const textToDownload = document.getElementById(id).textContent;
    // const fileName = "downloaded_file.txt";
    const fileName = `${name}`;
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
System.prototype.themeToggle = function(id){
    if(theme == 0){
        for(let i=0; i<themeSet[1].length; i++){
            document.documentElement.style.setProperty(themeSet[1][i][0], themeSet[1][i][1]);
        }
        theme = 1;
    }else{
        for(let i=0; i<themeSet[0].length; i++){
            document.documentElement.style.setProperty(themeSet[0][i][0], themeSet[0][i][1]);
        }
        theme = 0;
    }
}
System.prototype.setTheme = function(){
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches==true?1:0;
    for(let i=0; i<themeSet[theme].length; i++){
        document.documentElement.style.setProperty(themeSet[theme][i][0], themeSet[theme][i][1]);
    }
}
System.prototype.encodedURI = function(url, key){
    let str = url.toString().toLowerCase();
    for(let i=0; i<config.varchar.hash.length; i++){
        str = str.replaceAll(config.varchar.hash[i][0], config.varchar.hash[i][1]);
    }
    return str.toString();
}
System.prototype.encodedData = function(data){
    let str = data.toString();
    for(let i=0; i<config.varchar.encrypt.length; i++){
        str = str.replaceAll(config.varchar.encrypt[i][0], config.varchar.encrypt[i][1]);
    }
    return str.toString();
}
System.prototype.handelPyError = function(error){
    try{
        if(!system.error_layout){
            let temp = config.varchar.error_templet;
            temp = temp.replaceAll('<|error.code|>',error.code!=undefined?error.code:422);
            temp = temp.replaceAll('<|error.message|>',error.message!=undefined?error.message:"The server understood the content type of the request content, and the syntax of the request content was correct, but it was unable to process the contained instructions.");
            document.body.innerHTML += temp;
            document.body.style.overflowY = "hidden";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            system.error_layout = true;
        }else{
            document.body.removeChild(document.getElementById('errorPreview'));
            system.error_layout = false;
            system.handelPyError(error);
        }
    }catch(e){
        console.log(error,e);
    }
}
System.prototype.closePyError = function(){
    document.body.removeChild(document.getElementById('errorPreview'));
    window.location.reload();
}
System.prototype.compilerSetUp = function(){
    try{
        fetch('/compiler').then(response => response.json()).then(data => {
            compiler = data.compiler.valueOf();
        }).catch(error =>{
            console.error('Error: ',error);
        });
    }catch(e){
        console.log('Error to set up compiler!');
    }
}
System.prototype.openPrivacy = function(){
    let tab = new TAB();
    tab.open();
    let link = "/privacy";
    fetch(link, {
        method: 'GET',
        header: {
            "Content": "application/json"
        },
    }).then(response => response.json()).then(privacy => {
        document.querySelectorAll('.tabPage')[document.querySelectorAll('.tabPage').length-1].innerHTML = (privacy.privacy);
    }).catch(e => console.log(e));
}
System.prototype.closePrivacy = function(){
    let tab = new TAB();
    tab.close();
}
System.prototype.openTerms = function(){
    let tab = new TAB();
    tab.open();
    let link = "/terms";
    fetch(link, {
        method: 'GET',
        header: {
            "Content": "application/json"
        },
    }).then(response => response.json()).then(privacy => {
        document.querySelectorAll('.tabPage')[document.querySelectorAll('.tabPage').length-1].innerHTML = (privacy.privacy);
    }).catch(e => console.log(e));
}
System.prototype.openLicense = function(){
    let tab = new TAB();
    tab.open();
    let link = "/license";
    fetch(link, {
        method: 'GET',
        header: {
            "Content": "application/json"
        },
    }).then(response => response.json()).then(privacy => {
        document.querySelectorAll('.tabPage')[document.querySelectorAll('.tabPage').length-1].innerHTML = (privacy.privacy);
        setTimeout(()=>{
            document.querySelector('.license').innerText = document.querySelector('.license').textContent;
        })
    }).catch(e => console.log(e));
}
System.prototype.isOnline = function(){
    if(!navigator.onLine){
        error = {
            "code": 499,
            "message": "Connection lost, please fix your internet connection or run CHS localy, configure the dependencies for JPEN to start localhost"
        }
        system.handelPyError(error);
    }
}
System.prototype.codeset = function(name, lang, id){
    try{
        let appointCode, pyInterpreter, jsCompiler;
        setTimeout(()=>{
            appointCode = eval(compiler.appointCode);
            document.getElementById(id).innerText = appointCode(name, lang, compiler);
            if(lang == 'Python'){
                pyInterpreter = eval(compiler.pyInterpreter);
                pyInterpreter(`#${id}`);
            }else if(lang == 'Vanilla Js' || lang == 'Node Js' || lang == 'React Js'){
                jsCompiler = eval(compiler.jsCompiler);
                jsCompiler(`#${id}`);
            }else{
                console.log("Which language you try to compile, please define carefully!");
            }
            ideDeploy = eval(compiler.ideDeploy);
            ideDeploy(`#${id}`,`#${id}-line`, 0);
        },1000);
    }catch(e){
        document.getElementById(id).innerText = e+"\n\n";
    }
}
System.prototype.sendMemory = function(){
    fetch('/memory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dbdata: local_memory
        })
    }).then(data => data.json()).then(data => {
        console.log(data);
    }).catch(err => {
        console.log("Oops! system is busy to handle you");
    });
}
// setTimeout(()=>{
//     system.sendMemory();
// },1000);
System.prototype.pushDataBase = function(){
    memory.saveArray(local_memory);
}
MEMORY.prototype.openDB = function(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(memory.dbName, memory.dbVersion);
        request.onerror = (event) => {
            reject('Error to opening database');
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            resolve('Database opened successfully');
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const store = db.createObjectStore('data', { keyPath: 'id' });
        };
    });
}
MEMORY.prototype.saveArray = async function(array){
    memory.clearDB();
    await memory.openDB();
    const transaction = db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    array.forEach(item => {
        store.put(item);
    });
}
MEMORY.prototype.fetchArray = async function(){
    await memory.openDB();
    const transaction = db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');
    const request = store.getAll();
    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject('Error to fetching data');
        };
    });
}
MEMORY.prototype.clearDB = async function(){
    await memory.openDB();
    const transaction = db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    store.clear();
}
MEMORY.prototype.pullDataBase = async function(){
    local_memory = await memory.fetchArray();
}