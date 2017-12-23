import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';

interface IProps {
    value: string;
    valueOptions: string[];
    onChange?: (value: string) => void;
}

export class EditableTextDropdown extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(param: ClickParam) {
        if (this.props.onChange) {
            this.props.onChange(param.key);
        }
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {this.props.valueOptions.map(v => (
                    <Menu.Item key={v}>{v}</Menu.Item>
                ))}
            </Menu>
        );

        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    {this.props.value}
                </a>
            </Dropdown>
        );
    }
}

export default EditableTextDropdown;