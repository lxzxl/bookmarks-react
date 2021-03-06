import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/index.scss';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
