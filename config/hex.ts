module.exports = {
    pyerrorscanner: function pyerrorscanner(data){
        if((data*1) - (data*1) == 0){
            return true;
        }else{
            return false;
        }
    },
    pyerrorinfo: function pyerrorinfo(error_log, code){
        let message = '';
        for(let i=0; i<error_log.length; i++){
            if(error_log[i].code == code){
                message = error_log[i].desc;
            }
        }
        return {code, message};
    },
    isHosted: (req) => {
        const host = req.hostname;
        if(host === 'localhost' || host === '127.0.0.1'){
            return false;
        }else{
            return true;
        }
    },
    reward: (res) => {
        res.redirect('/nonAPIHost');
    },
    deviceVision: (userAgent) => {
        const isComputer = /Windows|Mac|Linux/i.test(userAgent) && !/Mobile/i.test(userAgent);
        const isMobile = /Android|iPhone|iPad|iPod|Kindle|BlackBerry/i.test(userAgent);
        const isMobileDesktop = /Android|iPhone|iPad|iPod/i.test(userAgent) && /Chrome|Safari|Firefox/i.test(userAgent) && !/Mobile/i.test(userAgent);
        let deviceVison;
        if(isComputer){
            deviceVison = 'Desktop';
        }else if(isMobile && isMobileDesktop){
            deviceVison = "Mobile's Desktop";
        }else{
            deviceVison = 'Mobile';
        }
        return deviceVison;
    },
    foo:() => {
        return 0;
    }
};