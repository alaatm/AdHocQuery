import * as React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import HTML5Backend from 'react-dnd-html5-backend';

import DraggableRow from './DraggableRow';
import { DragDropContextProvider } from 'react-dnd';

interface IProps<T> extends TableProps<T> {
    onRowDrag?: () => void;
}

export class DragSortingTable<T> extends React.Component<IProps<T>> {
    components = {
        body: {
            row: new DraggableRow({}),
        },
    };

    constructor(props: IProps<T>) {
        super(props);
    }

    moveRow = (dragIndex: number, hoverIndex: number) => {
        if (this.props.onRowDrag) {
            this.props.onRowDrag();
        }
        /*const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );*/
    }

    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <Table
                    {...this.props}
                    components={this.components}
                    onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow,
                    })}
                />
            </DragDropContextProvider>);
    }
}

export default DragSortingTable;