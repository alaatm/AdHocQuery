import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Widget } from '../../helpers';
import Store from '../../../Store';
import GroupView from './GroupView';

import './index.css';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class QueryFilters extends React.Component<IProps> {
    groupOperatorOptions = ['all', 'any', 'not all', 'none'];

    render() {
        const store = this.props.store!;

        return (
            <Widget title="Query Filters" className="aq-qry-filter">
                <ul className="root">
                    {store.queryFilterGroups.map((g, i) => <GroupView key={i} group={g} />)}
                </ul>
            </Widget>
        );
    }
}

export default QueryFilters;