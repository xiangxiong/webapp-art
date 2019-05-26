import {Toast} from 'antd-mobile';

window.WeChatPay = {};

// eslint-disable-next-line no-undef
WeChatPay.Base = (function(){
   var uniqInstance;
   function init(){
      var WeChatPay = function(payArgs,callback){
         try{
               var payParams = {
                  "appId":payArgs.appid,     
                  "timeStamp":payArgs.timestamp.toString() ,        
                  "nonceStr":payArgs.noncestr,  
                  "package":"prepay_id="+payArgs.prepayid,     
                  "signType":"MD5",           
                  "paySign":payArgs.sign
               };
               // eslint-disable-next-line no-undef
               WeixinJSBridge.invoke('getBrandWCPayRequest',
                     payParams,
                     function(res){
                        callback(res);
               });
         }
         catch(e)
         {
            Toast.info("请在微信客户端进行支付!");
         }
      }
      return {
         WeChatPay:function(payArgs,callback){
            return WeChatPay(payArgs,callback)
         }
      }
   }

   return {
      getInstance:function(){
         if(!uniqInstance) {
            uniqInstance = init()
        }
        return uniqInstance;
      }
   }

})();
