import * as React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import {
    DragDropContext, DragSource, DropTarget, DragSourceConnector, DragSourceMonitor,
    DropTargetConnector, DropTargetMonitor, ClientOffset, ConnectDragSource, ConnectDropTarget
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './DndTable.css';

interface IDraggableHTMLTableRowElementAttributes extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    isOver: boolean;
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
    dragRow: { index: number };
    clientOffset: ClientOffset;
    sourceClientOffset: ClientOffset;
    initialClientOffset: ClientOffset;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
}

function dragDirection(
    dragIndex: number,
    hoverIndex: number,
    initialClientOffset: ClientOffset,
    clientOffset: ClientOffset,
    sourceClientOffset: ClientOffset,
) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return 'downward';
    }
    if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return 'upward';
    }
    return '';
}

let BodyRow = (props: IDraggableHTMLTableRowElementAttributes) => {
    const {
        isOver,
        connectDragSource,
        connectDropTarget,
        moveRow,
        dragRow,
        clientOffset,
        sourceClientOffset,
        initialClientOffset,
        ...restProps
  } = props;
    const style = { cursor: 'move' };

    let className = restProps.className;
    if (isOver && initialClientOffset) {
        const direction = dragDirection(
            dragRow.index,
            restProps.index,
            initialClientOffset,
            clientOffset,
            sourceClientOffset
        );
        if (direction === 'downward') {
            className += ' drop-over-downward';
        }
        if (direction === 'upward') {
            className += ' drop-over-upward';
        }
    }

    return connectDragSource(
        connectDropTarget(
            <tr
                {...restProps}
                className={className}
                style={style}
            />
        )
    );
};

const rowSource = {
    beginDrag(props: IDraggableHTMLTableRowElementAttributes) {
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props: IDraggableHTMLTableRowElementAttributes, monitor: DropTargetMonitor) {
        const item = monitor.getItem() as IDraggableHTMLTableRowElementAttributes;

        const dragIndex = item.index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
    },
};

BodyRow = DropTarget('row', rowTarget, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('row', rowSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        dragRow: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(BodyRow)
    // tslint:disable-next-line:no-any
    ) as any;

interface IProps<T> extends TableProps<T> {
    onRowDrag: (dragIndex: number, hoverIndex: number) => void;
}

class DndTable<T> extends React.Component<IProps<T>> {
    components = {
        body: {
            row: BodyRow,
        },
    };

    constructor(props: IProps<T>) {
        super(props);
    }

    moveRow = (dragIndex: number, hoverIndex: number) => {
        this.props.onRowDrag(dragIndex, hoverIndex);
    }

    render() {
        return (
            <Table
                {...this.props}
                components={this.components}
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                })}
            />
        );
    }
}

export default DragDropContext(HTML5Backend)(DndTable);