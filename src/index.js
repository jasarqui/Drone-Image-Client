/* these are for react dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

/* insert assets here */
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import './assets/index.css';

/* render the components */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
