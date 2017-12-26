import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { ColumnProps } from 'antd/lib/table';
import { EditableText, EditableTextDropdown, DndTable, Widget } from '../helpers';
import { Field } from '../../Store/models';
import { Dropdown, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

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
            this.forceUpdate();
            field.updateSorting(
                value,
                Math.max(...sortedFields.map(o => o.sortingIndex), 0)
            );
        };
    }

    handleFieldAggregateUpdateClick(field: Field) {
        return (param: ClickParam) => {
            this.forceUpdate();
            field.setAggregate(param.key);
        };
    }

    handleFieldRemoveClick(field: Field) {
        const store = this.props.store!;
        return () => {
            store.removeSelectedField(field);
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
            render: (_, item) => {
                const strFieldMenu = (
                    <Menu onClick={this.handleFieldAggregateUpdateClick(item)}>
                        <Menu.Item key="None">None</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="Count">Count</Menu.Item>
                    </Menu>
                );

                const dateFieldMenu = (
                    <Menu onClick={this.handleFieldAggregateUpdateClick(item)}>
                        <Menu.Item key="Count">None</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="Count">Count</Menu.Item>
                        <Menu.Item key="Minimum">Minimum</Menu.Item>
                        <Menu.Item key="Maximum">Maximum</Menu.Item>
                    </Menu>
                );

                const numericFieldMenu = (
                    <Menu onClick={this.handleFieldAggregateUpdateClick(item)}>
                        <Menu.Item key="Count">None</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="Sum">Sum</Menu.Item>
                        <Menu.Item key="Count">Count</Menu.Item>
                        <Menu.Item key="Average">Average</Menu.Item>
                        <Menu.Item key="Minimum">Minimum</Menu.Item>
                        <Menu.Item key="Maximum">Maximum</Menu.Item>
                    </Menu>
                );

                let menu;
                if (item.type === 'array' || item.type === 'bool' || item.type === 'string') {
                    menu = strFieldMenu;
                } else if (item.type === 'date') {
                    menu = dateFieldMenu;
                } else if (item.type === 'number') {
                    menu = numericFieldMenu;
                } else {
                    throw new Error(`Invalid item type: '${item.type}'`);
                }

                return (
                    <React.Fragment>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a href="#" className={item.aggregate ? 'has-aggregate' : ''}>
                                <i className="icon-font" title="Toggle aggregate/simple column" />
                            </a>
                        </Dropdown>
                        <a href="#" onClick={this.handleFieldRemoveClick(item)} >
                            <i className="icon-times" title="Delete" />
                        </a>
                    </React.Fragment>
                );
            }
        }];
    }
}

export default SelectedFields;