import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import Layout from './Layout';
import './index.css';

mobx.useStrict(true);

let mobxDevTools: JSX.Element | boolean = false;
if (process.env.NODE_ENV === 'development') {
    const DevTools = require('mobx-react-devtools').default;
    mobxDevTools = <DevTools />;
}

ReactDOM.render(
    <div>{mobxDevTools}<Layout /></div>,
    document.getElementById('root') as HTMLElement
);
