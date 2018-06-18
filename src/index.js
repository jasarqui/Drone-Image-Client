/* these are for react dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

/* insert assets here */
import 'font-awesome/css/font-awesome.css';
import 'bulma/css/bulma.css';
import './assets/index.css';

/* color palette */
// 000080 navy
// FFFFFF white
// 0A090C some kind of blackish gray
// F0EDEE some light grayish color
// 07393C some kind of greenish blue

/* render the components */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
