import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Table, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Widget } from '../helpers';
import { Column } from '../../Store/models';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SortedFields extends React.Component<IProps, {}> {
    render() {
        const sortedColumns = this.props.store!.sortedFields;

        return (
            <Widget title="Sorted Columns" className="aq-sor-cols">
                <Table
                    columns={this.getColumns()}
                    rowKey={(record: Column) => record.id}
                    dataSource={sortedColumns}
                    size="middle"
                    showHeader={sortedColumns.length ? true : false}
                    pagination={false}
                />
            </Widget>
        );
    }

    private getColumns(): ColumnProps<Column>[] {
        return [{
            title: 'Column',
            dataIndex: 'text',
        }, {
            title: 'Sorting',
            dataIndex: 'sorting',
        }, {
            title: '',
            className: 'manage',
            render: (_, item) => (
                <a href="#" onClick={item.removeSorting}>
                    <Icon type="delete" title="Delete" />
                </a>)
        }];
    }
}

export default SortedFields;