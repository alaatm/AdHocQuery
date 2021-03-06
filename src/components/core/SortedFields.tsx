import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { ColumnProps } from 'antd/lib/table';
import { DndTable, Widget } from '../helpers';
import { Field } from '../../Store/models';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SortedFields extends React.Component<IProps, {}> {
    handleClearAllClick = () => {
        this.props.store!.clearSortedFieldsList();
    }

    handleRowDrag = (dragIndex: number, hoverIndex: number) => {
        this.props.store!.switchSortedFields(dragIndex, hoverIndex);
    }

    render() {
        const sortedFields = this.props.store!.sortedFields;

        return (
            <Widget
                icon="icon-sort-amount-asc"
                title="Sorted Fields"
                actions={[{ name: 'Clear all', icon: 'close-circle', isEnabled: sortedFields.length > 0 }]}
                onActionClick={this.handleClearAllClick}
                className="aq-sor-cols"
            >
                <DndTable
                    columns={this.getColumns()}
                    rowKey={(record: Field) => record.id}
                    dataSource={sortedFields}
                    size="middle"
                    showHeader={sortedFields.length ? true : false}
                    pagination={false}
                    onRowDrag={this.handleRowDrag}
                />
            </Widget>
        );
    }

    private getColumns(): ColumnProps<Field>[] {
        return [{
            title: 'Field',
            dataIndex: 'text',
            width: '60%'
        }, {
            title: 'Sorting',
            dataIndex: 'sorting',
        }, {
            title: '',
            className: 'actions',
            render: (_, item) => (
                <a href="#" onClick={item.removeSorting}>
                    <i className="icon-times" title="Delete" />
                </a>)
        }];
    }
}

export default SortedFields;