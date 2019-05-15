import axios from 'axios';

// todo: 增加请求拦截器.
// https://segmentfault.com/a/1190000016474460#articleHeader4.

const request = function (url, params, config, method) {
    return new Promise((resolve, reject) => {
      axios[method](url, params, Object.assign({}, config)).then(response => {
        console.log('url',url,'response',response.data);
        resolve(response.data)
      }, err => {
        if (err.Cancel) {
          console.log(err)
        } else {
          reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  const post = (url, params, config = {}) => {
    return request(url, params, config, 'post')
  }

  const get = (url, params, config = {}) => {
    return request(url, params, config, 'get')
  }
  
  export {post, get}

  