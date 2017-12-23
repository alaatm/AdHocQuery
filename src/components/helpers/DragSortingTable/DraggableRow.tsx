import * as React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

interface IProps {
    isOver?: any;
    connectDragSource?: any;
    connectDropTarget?: any;
    moveRow?: any;
    dragRow?: any;
    clientOffset?: any;
    sourceClientOffset?: any;
    initialClientOffset?: any;
    className?: any;
    index?: any;
}

const rowSource = {
    beginDrag(props: any) {
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props: any, monitor: any) {
        const dragIndex = monitor.getItem().index;
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
        monitor.getItem().index = hoverIndex;
    },
};

@DragSource('TableRow', rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
@DropTarget('TableRow', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export class DraggableRow extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
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
          } = this.props;

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
                    style={{ cursor: 'move' }}
                />
            )
        );
    }
}

function dragDirection(
    dragIndex: number,
    hoverIndex: number,
    initialClientOffset: any,
    clientOffset: any,
    sourceClientOffset: any,
) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return 'downward';
    }
    if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return 'upward';
    }

    throw new Error('Shouldnt get this');
}

export default DraggableRow;