export const DEVHOST = 'http://artapi.laoliwuyou.com/gateway?format=json';
// yapi  
export const MOOCHOST = 'http://yapi.demo.qunar.com/mock/65279/';

export const APIURL = 'http://artapi.laoliwuyou.com/gateway?format=json';

export const PICTUREURL = 'http://res.laoliwuyou.com/icon/';

export const SERVICEPICTUREURL = 'http://res.laoliwuyou.com';

export const DevEnv = true;

export const HOST = DevEnv ? DEVHOST : MOOCHOST;

export const API_USER_INFO = `${HOST}/api/v1/user/update`;