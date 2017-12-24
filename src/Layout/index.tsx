import * as React from 'react';
import { Provider } from 'mobx-react';
import { Fields, Header, QueryFilters, Results, SelectedFields, SortedFields } from '../components/core';

import Store from '../Store';

import './index.css';

export default class Layout extends React.Component {
    render() {
        return (
            <Provider store={new Store()}>
                <div className="container-fixed">
                    <div className="row">
                        <div className="col-md-24">
                            <div className="aq-header"><Header /></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-5">
                            <Fields />
                        </div>
                        <div className="col-md-19">
                            <div className="row">
                                <div className="col-md-16 no-pad">
                                    <SelectedFields />
                                </div>
                                <div className="col-md-8">
                                    <SortedFields />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-24 no-left-pad">
                                    <QueryFilters />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-24">
                            <Results />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}