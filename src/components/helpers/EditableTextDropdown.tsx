import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;

interface IProps<T> {
    value: T;
    bold?: boolean;
    valueOptions: T[];
    textPropertyAccessor?: string;
    childrenPropertyAccessor?: string;
    dividerFlagPropertyAccessor?: string;
    onChange?: (value: T) => void;
    triggerChangeOnParentNodes?: boolean;
    disabled?: boolean;
}

export class EditableTextDropdown<T> extends React.Component<IProps<T>> {
    constructor(props: IProps<T>) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(param: ClickParam) {
        if (this.props.onChange) {
            const obj = this.findObj(this.props.valueOptions.slice(0), param.key)!;
            const childProp = this.props.childrenPropertyAccessor;
            const hasChildren = childProp && obj[childProp] && obj[childProp].length;

            if (!hasChildren || (hasChildren && this.props.triggerChangeOnParentNodes)) {
                this.props.onChange(obj);
            }
        }
    }

    findObj(values: T[], key: string, parent?: string): T | null {
        const textProp = this.props.textPropertyAccessor;

        for (const v of values) {
            const text = textProp ? v[textProp] : v;
            const keyText = parent ? `${parent}.${text}` : text;

            if (keyText === key) {
                return v;
            } else {
                const childProp = this.props.childrenPropertyAccessor;
                const hasChildren = childProp && v[childProp] && v[childProp].length;

                if (hasChildren) {
                    const value = this.findObj(v[childProp!].slice(0), key, keyText);
                    if (value) {
                        return value;
                    }
                }
            }
        }

        return null;
    }

    findObjPath(arr: T[], parentPath: string): string | null {
        const textProp = this.props.textPropertyAccessor;

        for (const v of arr) {
            const text = (textProp ? v[textProp] : v) as string;
            const path = parentPath ? `${parentPath}.${text}` : text;

            if (v === this.props.value) {
                return path;
            } else {
                const childProp = this.props.childrenPropertyAccessor;
                const hasChildren = childProp && v[childProp] && v[childProp].length;

                if (hasChildren) {
                    const childPath = this.findObjPath(v[childProp!].slice(0), path);
                    if (childPath) {
                        return childPath;
                    }
                }
            }
        }

        return null;
    }

    renderNode(node: T, parent?: string): JSX.Element | JSX.Element[] {
        const textProp = this.props.textPropertyAccessor;
        const childProp = this.props.childrenPropertyAccessor;
        const divFlagProp = this.props.dividerFlagPropertyAccessor;

        const text = textProp ? node[textProp] : node;
        const keyText = parent ? `${parent}.${text}` : text;
        const hasChildren = childProp && node[childProp] && node[childProp].length;

        if (hasChildren) {
            const children = node[childProp!] as T[];

            return (
                <SubMenu key={keyText} title={keyText}>
                    {children.map(c => this.renderNode(c, keyText))}
                </SubMenu>
            );
        } else {
            return divFlagProp && node[divFlagProp]
                ? [<Menu.Divider key={`${keyText}-divider`} />, <Menu.Item key={keyText}>{text}</Menu.Item>]
                : <Menu.Item key={keyText}>{text}</Menu.Item>;
        }
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {this.props.valueOptions.map(v => this.renderNode(v))}
            </Menu>
        );

        const textProp = this.props.textPropertyAccessor;
        const childProp = this.props.childrenPropertyAccessor;

        const text = textProp
            ? childProp
                ? this.findObjPath(this.props.valueOptions.slice(0), '')
                : this.props.value[textProp]
            : this.props.value;

        const bold = this.props.bold;

        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <a className={this.props.disabled ? 'disabled' : ''} href="#">
                    {bold ? <strong>{text}</strong> : text}
                </a>
            </Dropdown>
        );
    }
}

export default EditableTextDropdown;