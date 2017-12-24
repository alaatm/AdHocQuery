import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { EditableText, EditableTextDropdown, Widget } from '../helpers';
import { Column } from '../../Store/models';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SelectedFields extends React.Component<IProps, {}> {
    render() {
        const selectedColumns = this.props.store!.selectedFields.slice();
        // The below code is just there so that we can pick up mobx
        // store changes on sorted columns :-/
        const sortedColumns = this.props.store!.sortedFields;
        console.log(sortedColumns.length);

        return (
            <Widget title="Selected Columns" className="aq-sel-cols">
                <Table
                    columns={this.getColumns()}
                    rowKey={(record: Column) => record.id}
                    dataSource={selectedColumns}
                    size="middle"
                    showHeader={selectedColumns.length ? true : false}
                    pagination={false}
                />
            </Widget>
        );
    }

    private getColumns(): ColumnProps<Column>[] {
        return [{
            title: 'Expression',
            dataIndex: 'text',
            width: '40%',
        }, {
            title: 'Title',
            dataIndex: 'title',
            width: '40%',
            render: (text, item) => <EditableText value={text} onChange={item.updateTitle} />
        }, {
            title: 'Sorting',
            dataIndex: 'sorting',
            render: (text, item) => (
                <EditableTextDropdown
                    value={text || 'None'}
                    onChange={item.updateSorting}
                    valueOptions={['Asc', 'Desc', 'None']}
                />)
        }];
    }
}

export default SelectedFields;