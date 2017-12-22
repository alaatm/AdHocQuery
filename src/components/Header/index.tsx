import * as React from 'react';
import './index.css';
const logo = require('./logo.png');

export class Header extends React.Component {
    render() {
        return (
            <div>
                <img src={logo} alt="AdHoq Query" />
                AdHoq Query
                <div className="pull-right">
                    <button>Load</button>
                    <button>Save</button>
                </div>
            </div>
        );
    }
}

export default Header;