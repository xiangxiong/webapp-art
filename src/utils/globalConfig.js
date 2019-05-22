(function(window){
    var global = {
        /***
         *  全局配置类.
         *  */
        globalConfig: { navigator:{}},
        isValidNavigator(){
            return (
                (this.globalConfig.navigator.isWechat === true)
            )
        },
        /**
         *  限制打开环境
         *  */
        navigatorAgent(){
            return;
            if(!this.globalConfig.debug && !this.isValidNavigator()){
                window.top.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=XXX&connect_redirect=1#wechat_redirect';
            }
        },
        /**
         *  日志配置.
         *  */
        logConfig(){
            console.log('logConfig');
        },
        /**
         *  获取UA
         *  */
        userAgent(){
            if (navigator.userAgent.match(/(MicroMessenger)\/([\d\.]+)/i) !== null) {
                return 'wechat';
              }
              if (navigator.userAgent.match(/(AlipayClient)\/([\d\.]+)/i) !== null) {
                return 'alipay';
              }
              if (/mobile|table|ip(ad|hone|od)|android/i.test(navigator.userAgent)) {
                return 'mobile';
              }
              return 'desktop';
        },
        /**
         *  初始化配置
         * */
        initConfig(){
            const ua = this.userAgent();
            this.globalConfig.navigator = {
                ua:ua,
                [`is_${ua}`.replace(/[-|_](\w)/g, ($0, $1) => $1.toUpperCase())]: true
            };
            this.globalConfig[
                process.env.ENV_CONFIG === 'dev' ? 'debug' : process.env.ENV_CONFIG
              ] = true;

            const console =
              process.env.ENV_CONFIG === 'dev' || process.env.ENV_CONFIG === 'sit';
            console && (this.globalConfig.console = console);
            this.navigatorAgent();  
        }
    };
    
    try{
        let sessionConfig = JSON.parse(sessionStorage.globalConfig || '{}');
        sessionConfig.console != undefined &&
        (global.globalConfig.console = sessionConfig.console);
    }
    catch(error){

    }
    global.initConfig();
    window.$globalConfig = Object.assign(
        {},
        window.$globalConfig || {},
        global.globalConfig
    )
})(window);