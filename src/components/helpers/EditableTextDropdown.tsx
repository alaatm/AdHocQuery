import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';

interface IProps {
    value: string;
    valueOptions: string[];
    onChange?: (value: string) => void;
}

interface IState {
    value: string;
}

export class EditableTextDropdown extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { value: props.value };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(param: ClickParam) {
        this.setState({ value: param.key });
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
                    {this.state.value}
                </a>
            </Dropdown>
        );
    }
}

export default EditableTextDropdown;