import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../../Store';
import { Widget } from '../helpers';
import { Tree } from 'antd';
import { IFieldDescriptor, ITableDescriptor, isTableDescriptor } from '../../interfaces';
const TreeNode = Tree.TreeNode;

interface IProps {
    store?: Store;
}

@inject('store')
@observer
export class Fields extends React.Component<IProps, {}> {
    constructor(props: {}) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(checkedKeys: string[]) {
        this.props.store!.setSelectedFields(checkedKeys);
    }

    renderNodes(data: (ITableDescriptor | IFieldDescriptor)[]): JSX.Element[] {
        return data.map((item, i) => {
            if (isTableDescriptor(item)) {
                return (
                    <TreeNode title={item.text} key={item.id} selectable={false}>
                        {this.renderNodes(item.fields)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.text} selectable={false} />;
        });
    }

    render() {
        const checkedKeys = this.props.store!.selectedFields.map(p => p.id);

        return (
            <Widget title="Available Fields" className="aq-avail-cols">
                <Tree
                    checkable={true}
                    onCheck={this.handleCheck}
                    checkedKeys={checkedKeys}
                >
                    {this.renderNodes(this.props.store!.allFields)}
                </Tree>
            </Widget>
        );
    }
}

export default Fields;
