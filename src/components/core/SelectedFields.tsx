import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { ColumnProps } from 'antd/lib/table';
import { EditableText, EditableTextDropdown, DndTable, Widget } from '../helpers';
import { Field } from '../../Store/models';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SelectedFields extends React.Component<IProps, {}> {
    handleClearAllClick = () => {
        this.props.store!.clearSelectedFieldsList();
    }

    handleRowDrag = (dragIndex: number, hoverIndex: number) => {
        this.props.store!.switchSelectedFields(dragIndex, hoverIndex);
    }

    render() {
        const selectedColumns = this.props.store!.selectedFields.slice();
        // The below code is just there so that we can pick up mobx
        // store changes on sorted columns :-/
        const sortedColumns = this.props.store!.sortedFields;
        // tslint:disable-next-line:no-console
        console.log(sortedColumns.length);

        return (
            <Widget
                icon="icon-list-ol"
                title="Selected Fields"
                actions={[{ name: 'Clear all', icon: 'close-circle', isEnabled: selectedColumns.length > 0 }]}
                onActionClick={this.handleClearAllClick}
                className="aq-sel-cols"
            >
                <DndTable
                    columns={this.getColumns()}
                    rowKey={(record: Field) => record.id}
                    dataSource={selectedColumns}
                    size="middle"
                    showHeader={selectedColumns.length ? true : false}
                    pagination={false}
                    onRowDrag={this.handleRowDrag}
                />
            </Widget>
        );
    }

    handleSortingChange(field: Field) {
        const sortedFields = this.props.store!.sortedFields;

        return (value: string) => {
            field.updateSorting(
                value,
                Math.max(...sortedFields.map(o => o.sortingIndex), 0)
            );
        };
    }

    private getColumns(): ColumnProps<Field>[] {
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
                    onChange={this.handleSortingChange(item)}
                    valueOptions={['Asc', 'Desc', 'None']}
                />)
        }, {
            title: '',
            className: 'actions',
            render: (_, item) => (
                <React.Fragment>
                    <a href="#" >
                        <i className="icon-function" title="Toggle aggregate/simple column" />
                    </a>
                    <a href="#">
                        <i className="icon-times" title="Delete" />
                    </a>
                </React.Fragment>
            )
        }];
    }
}

export default SelectedFields;