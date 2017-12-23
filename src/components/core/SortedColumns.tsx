import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Widget } from '../helpers';
import { IColumnDescriptor } from '../../interfaces';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SortedColumns extends React.Component<IProps, {}> {
    render() {
        const sortedColumns = this.props.store!.sortedColumns;

        return (
            <Widget title="Sorted Columns" className="aq-sor-cols">
                <Table
                    columns={this.getColumns()}
                    rowKey={(record: IColumnDescriptor) => record.id}
                    dataSource={sortedColumns}
                    size="middle"
                    showHeader={sortedColumns.length ? true : false}
                    pagination={false}
                />
            </Widget>
        );
    }

    private getColumns(): ColumnProps<IColumnDescriptor>[] {
        return [{
            title: 'Column',
            dataIndex: 'text',
        }, {
            title: 'Sorting',
            dataIndex: 'sorting',
        }];
    }
}

export default SortedColumns;