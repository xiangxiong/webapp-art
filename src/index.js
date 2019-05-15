import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'lib-flexible';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
