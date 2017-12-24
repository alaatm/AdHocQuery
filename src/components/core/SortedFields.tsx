import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { DndTable, Widget } from '../helpers';
import { Field } from '../../Store/models';

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class SortedFields extends React.Component<IProps, {}> {
    handleRowDrag = (dragIndex: number, hoverIndex: number) => {
        this.props.store!.switchSortedFields(dragIndex, hoverIndex);
    }

    render() {
        const sortedColumns = this.props.store!.sortedFields;

        return (
            <Widget title="Sorted Fields" className="aq-sor-cols">
                <DndTable
                    columns={this.getColumns()}
                    rowKey={(record: Field) => record.id}
                    dataSource={sortedColumns}
                    size="middle"
                    showHeader={sortedColumns.length ? true : false}
                    pagination={false}
                    onRowDrag={this.handleRowDrag}
                />
            </Widget>
        );
    }

    private getColumns(): ColumnProps<Field>[] {
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