import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { EditableText, EditableTextDropdown, Widget } from '../helpers';
import { IColumnDescriptor } from '../../interfaces';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SelectedColumns extends React.Component<IProps, {}> {
    handleTitleChange = (id: string) => {
        return (value: string) => {
            this.props.store!.updateTitleText(id, value);
        };
    }

    handleSortChange = (id: string) => {
        return (value: string) => {
            this.props.store!.updateSorting(id, value);
        };
    }

    render() {
        const selectedColumns = this.props.store!.selectedColumns.slice();

        return (
            <Widget title="Selected Columns" className="aq-sel-cols">
                <Table
                    columns={this.getColumns()}
                    rowKey={(record: IColumnDescriptor) => record.id}
                    dataSource={selectedColumns}
                    size="middle"
                    showHeader={selectedColumns.length ? true : false}
                    pagination={false}
                />
            </Widget>
        );
    }

    private getColumns(): ColumnProps<IColumnDescriptor>[] {
        return [{
            title: 'Expression',
            dataIndex: 'text',
            width: '40%',
        }, {
            title: 'Title',
            dataIndex: 'title',
            width: '40%',
            render: (text, item) => <EditableText value={text} onChange={this.handleTitleChange(item.id)} />
        }, {
            title: 'Sorting',
            dataIndex: 'sorting',
            render: (text, item) => (
                <EditableTextDropdown
                    value={text || 'None'}
                    onChange={this.handleSortChange(item.id)}
                    valueOptions={['Asc', 'Desc', 'None']}
                />)
        }];
    }
}

export default SelectedColumns;