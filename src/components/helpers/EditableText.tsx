import * as React from 'react';
import { Input } from 'antd';

interface IProps {
    value: string;
    onChange?: (value: string) => void;
}

interface IState {
    value: string;
    isEditing: boolean;
}

export class EditableText extends React.Component<IProps, IState> {
    private _input: Input | null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: props.value,
            isEditing: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePressEnter = this.handlePressEnter.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLSpanElement>) {
        e.preventDefault();
        this.setState(
            {
                isEditing: true
            },
            () => (this._input && (this._input.focus() || this._input.input.select()))
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: e.target.value });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    handlePressEnter(e: React.FormEvent<{}>) {
        this.setState({ isEditing: false });
    }

    handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        this.setState({ isEditing: false });
    }

    render() {
        const { value, isEditing } = this.state;

        return (
            isEditing
                ? (
                    <Input
                        onPressEnter={this.handlePressEnter}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        type="text"
                        value={value}
                        ref={(input) => this._input = input}
                    />)
                : <a href="#" onClick={this.handleClick}>{value}</a>
        );
    }
}

export default EditableText;