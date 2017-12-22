import * as React from 'react';
import { Widget } from '../Widget/index';

export class SortedColumns extends React.Component {
    render() {
        return (
            <Widget title="Available Columns" className="aq-sor-cols">
                <p>Sorted Columns</p>
            </Widget>
        );
    }
}

export default SortedColumns;