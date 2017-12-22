import * as React from 'react';
import { Button, Tooltip } from 'antd';
import './index.css';
const logo = require('./logo.png');

export class Header extends React.Component {
    render() {
        return (
            <div>
                <img src={logo} alt="AdHoq Query" />
                &nbsp;&nbsp;AdHoq Query
                <div className="pull-right">
                    <Button type="primary" icon="folder-open">Load</Button>
                    &nbsp;&nbsp;
                    <Button type="primary" icon="save">Save</Button>
                    &nbsp;&nbsp;
                    <Tooltip placement="top" title="View video tutorial">
                        <Button type="primary" icon="youtube" />
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export default Header;