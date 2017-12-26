import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { QueryFilter, QueryFilterGroup } from '../../../Store/models';
import { EditableTextDropdown } from '../../helpers/index';
import Store from '../../../Store';
import { Select, DatePicker, InputNumber, Input } from 'antd';
import * as moment from 'moment';
const Option = Select.Option;

interface IProps {
    store?: Store;
    filter: QueryFilter;
    group: QueryFilterGroup;
}

@inject('store')
@observer
export class FilterView extends React.Component<IProps> {
    handleRemoveFilterClick = () => {
        this.props.group.removeFilter(this.props.filter);
    }

    handleSelectChange = (value: string[]) => {
        this.props.filter.setValue(value);
    }

    handleDateChange = (date: moment.Moment, dateString: string) => {
        this.props.filter.setValue(dateString);
    }

    handleDate1Change = (date: moment.Moment, dateString: string) => {
        this.props.filter.setValue1(dateString);
    }

    handleDate2Change = (date: moment.Moment, dateString: string) => {
        this.props.filter.setValue2(dateString);
    }

    handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.filter.setValue(e.target.value);
    }

    renderOperationInput() {
        const { filter } = this.props;
        let value: number | string | string[] | moment.Moment | undefined = undefined;

        switch (filter.operation.fieldType) {
            case 'array':
                switch (filter.operation.inputCount) {
                    case 0:
                        return <React.Fragment />;
                    case 1:
                        value = filter.value ? filter.value as string[] : [];
                        return (
                            <td className="last">
                                <Select
                                    style={{ width: '100%' }}
                                    mode="multiple"
                                    placeholder="Select items"
                                    defaultValue={value}
                                    onChange={this.handleSelectChange}
                                    disabled={!filter.enabled}
                                >
                                    {filter.field.valueOptions!.map(p => <Option key={p}>{p}</Option>)}
                                </Select>
                            </td>
                        );
                    default:
                        throw new Error('Invalid inputCount.');
                }
            case 'bool':
                return <React.Fragment />;
            case 'date':
                switch (filter.operation.inputCount) {
                    case 0:
                        return <React.Fragment />;
                    case 1:
                        if (filter.value) {
                            value = moment(filter.value as string, 'DD-MMM-YYYY');
                        }
                        return (
                            <td className="last">
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD-MMM-YYYY"
                                    placeholder="Select date"
                                    defaultValue={value}
                                    onChange={this.handleDateChange}
                                    disabled={!filter.enabled}
                                />
                            </td>
                        );
                    case 2:
                        let value1: moment.Moment | undefined = undefined;
                        if (filter.value1) {
                            value1 = moment(filter.value1, 'DD-MMM-YYYY');
                        }
                        let value2: moment.Moment | undefined = undefined;
                        if (filter.value2) {
                            value2 = moment(filter.value2, 'DD-MMM-YYYY');
                        }
                        return (
                            <React.Fragment>
                                <td className="last-half">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        format="DD-MMM-YYYY"
                                        placeholder="Select 'from' date"
                                        defaultValue={value1}
                                        onChange={this.handleDate1Change}
                                        disabled={!filter.enabled}
                                    />
                                </td>
                                <td>{filter.operation.middleText}</td>
                                <td className="last-half">
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        format="DD-MMM-YYYY"
                                        placeholder="Select 'to' date"
                                        defaultValue={value2}
                                        onChange={this.handleDate2Change}
                                        disabled={!filter.enabled}
                                    />
                                </td>
                            </React.Fragment>
                        );
                    default:
                        throw new Error('Invalid inputCount.');
                }
            case 'number':
                value = filter.value ? filter.value as number : undefined;
                switch (filter.operation.inputCount) {
                    case 0:
                        return <React.Fragment />;
                    case 1:
                        return (
                            <td className="last">
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Enter value"
                                    defaultValue={value}
                                    onChange={filter.setValue}
                                    disabled={!filter.enabled}
                                />
                            </td>
                        );
                    default:
                        throw new Error('Invalid inputCount.');
                }
            case 'string':
                value = filter.value ? filter.value as string : undefined;
                switch (filter.operation.inputCount) {
                    case 0:
                        return <React.Fragment />;
                    case 1:
                        return (
                            <td className="last">
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="Enter value"
                                    defaultValue={value}
                                    onChange={this.handleStringChange}
                                    disabled={!filter.enabled}
                                />
                            </td>
                        );
                    default:
                        throw new Error('Invalid inputCount.');
                }
            default:
                throw new Error('Invalid field type.');
        }
    }

    renderFilter() {
        const store = this.props.store!;
        const { filter } = this.props;

        return (
            <React.Fragment>
                <td>
                    <EditableTextDropdown
                        value={filter.field}
                        valueOptions={store.allFields}
                        textPropertyAccessor="text"
                        childrenPropertyAccessor="fields"
                        onChange={filter.setField}
                        disabled={!filter.enabled}
                    />
                    &nbsp;
                    <EditableTextDropdown
                        value={filter.operation}
                        bold={true}
                        valueOptions={filter.operationList}
                        textPropertyAccessor="name"
                        dividerFlagPropertyAccessor="dividerBefore"
                        onChange={filter.setOperation}
                        disabled={!filter.enabled}
                    />
                </td>
                {this.renderOperationInput()}
            </React.Fragment>
        );
    }

    render() {
        const { filter } = this.props;

        return (
            <li className="filter" >
                <table><tbody><tr>
                    {this.renderFilter()}
                    <td className="last actions">
                        <div>
                            <a>
                                <span
                                    onClick={filter.toggle}
                                    className={filter.enabled ? 'icon-toggle-on' : 'icon-toggle-off'}
                                    title={filter.enabled ? 'Disable' : 'Enable'}
                                />
                            </a>
                            <a>
                                <span
                                    onClick={this.handleRemoveFilterClick}
                                    className="icon-times"
                                    title="Remove"
                                />
                            </a>
                        </div>
                    </td>
                </tr></tbody></table>
            </li>
        );
    }
}

export default FilterView;