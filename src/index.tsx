import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'bulma/css/bulma.css';
import './styles/index.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
