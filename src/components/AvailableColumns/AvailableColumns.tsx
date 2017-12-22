import * as React from 'react';
import { Widget } from '../Widget/index';

export class AvailableColumns extends React.Component {
    render() {
        return (
            <Widget title="Available Columns" className="aq-avail-cols">
                <p>Available Columns</p>
            </Widget>
        );
    }
}

export default AvailableColumns;