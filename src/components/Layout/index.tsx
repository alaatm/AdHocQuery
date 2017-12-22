import * as React from 'react';
import { Header } from '../Header';
import { AvailableColumns } from '../AvailableColumns';
import { SelectedColumns } from '../SelectedColumns';
import { SortedColumns } from '../SortedColumns';
import { QueryFilters } from '../QueryFilters';
import { Results } from '../Results';

import './index.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="container-fixed">
                <div className="row">
                    <div className="col-md-24">
                        <div className="aq-header"><Header /></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="aq-avail-cols"><AvailableColumns /></div>
                    </div>
                    <div className="col-md-19">
                        <div className="row">
                            <div className="col-md-16">
                                <div className="aq-sel-cols"><SelectedColumns /></div>
                            </div>
                            <div className="col-md-8">
                                <div className="aq-sor-cols"><SortedColumns /></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-24">
                                <div className="aq-qry-filter"><QueryFilters /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-24">
                        <div className="aq-results"><Results /></div>
                    </div>
                </div>
            </div>);
    }
}