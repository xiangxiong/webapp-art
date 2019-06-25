export const DEVHOST = 'http://artapi.laoliwuyou.com/gateway?format=json';
// yapi
export const MOOCHOST = 'http://yapi.demo.qunar.com/mock/65279/';
export const APIURL = 'http://artapi.laoliwuyou.com/gateway?format=json';
export const PICTUREURL = 'http://res.laoliwuyou.com/icon/';
export const SERVICEPICTUREURL = 'http://res.laoliwuyou.com';
export const PRODUCTURL = 'http://art.laoliwuyou.com';
export const DevEnv = true;
export const HOST = DevEnv ? DEVHOST : MOOCHOST;
export const API_USER_INFO = `${HOST}/api/v1/user/update`;
export const API_PAY = 'http://artpay.laoliwuyou.com/json/reply/PayApiRequest';
export const DEVIMGURL = 'http://art.laoliwuyou.com';
export const PRODIMGURL = 'http://res.laoliwuyou.com';
export var isDev = true;
export const IMGURL = isDev === true ? DEVIMGURL:PRODIMGURL;

// export const DEVHOST = 'http://artapi.cfyishudj.com/gateway?format=json';
// export const MOOCHOST = 'http://yapi.demo.qunar.com/mock/65279/';
// export const APIURL = 'http://artapi.cfyishudj.com/gateway?format=json';
// export const PICTUREURL = 'http://res.cfyishudj.com/icon/';
// export const SERVICEPICTUREURL = 'http://res.cfyishudj.com';
// export const PRODUCTURL = 'http://art.cfyishudj.com';
// export const DevEnv = true;
// export const HOST = DevEnv ? DEVHOST : MOOCHOST;
// export const API_USER_INFO = `${HOST}/api/v1/user/update`;
// export const API_PAY = 'http://artpay.cfyishudj.com/json/reply/PayApiRequest';
// export const IMGURL = 'http://art.cfyishudj.com';
// export const PRODIMGURL = 'http://res.cfyishudj.com';
