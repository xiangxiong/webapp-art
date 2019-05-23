window.Storage = {};

Storage.Base = (function(){
    var uniqInstance;

    function init(){
         /**
         * @param key
         * @param data
         * @param time 失效时间（秒）,默认一周
         * @returns {boolean}
         */
        var set = function(key,value,time){
            try{
                if(!localStorage){
                    return false;
                }
                if(!time || isNaN(time)){
                    time = 60 * 60 * 24 * 7;
                }
                var cacheExpireDate = (new Date() -1) + time * 1000;
                var cacheVal = {val:value, exp: cacheExpireDate};
                localStorage.setItem(key,JSON.stringify(cacheVal));
            }catch(e){
                console.log(e);
            }
            return null;
        };

        var get = function(key){
            try{
                if(!localStorage){
                    return false;
                }
                var cacheVal = localStorage.getItem(key);
                var result = JSON.parse(cacheVal);
                var now = new Date() - 1;
                // 缓存不存在
                if(!result){
                    return null;
                }
                // 缓存过期
                if(now > result.exp){
                    remove(key);
                    return "";
                }
                return result.val;
            }
            catch(e)
            {
                remove(key);
                return null;
            }
        }

        var remove = function(key){
            if(!localStorage){
                return false;
            }
            localStorage.removeItem(key);
        }

        return {
            set: function(key,val,time){
                return set(key,val,time)
            },
            get: function(key){
                return get(key);
            }
        }
    }
    
    return {
        getInstance: function(){
            if(!uniqInstance){
                uniqInstance = init()
            }
            return uniqInstance;
        }
    }
})();

