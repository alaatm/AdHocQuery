import * as React from 'react';
import { Widget } from '../Widget/index';

export class SelectedColumns extends React.Component {
    render() {
        return (
            <Widget title="Available Columns" className="aq-sel-cols">
                <p>Selected Columns</p>
            </Widget>
        );
    }
}

export default SelectedColumns;