import * as React from 'react';
import { Widget } from '../Widget/index';

export class QueryFilters extends React.Component {
    render() {
        return (
            <Widget title="Available Columns" className="aq-qry-filter">
                <p>Query Filters</p>
            </Widget>
        );
    }
}

export default QueryFilters;