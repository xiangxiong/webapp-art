import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './../src/utils/globalConfig';
import './../src/utils/payment';
import './../src/utils/upload/jquery.min.js';
import './../src/utils/upload/aliyun-oss-sdk-5.3.1.min.js';
import './../src/utils/upload/aliyun-upload-sdk-1.5.0.min.js';
import './../src/utils/upload/es6-promise.min.js';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

