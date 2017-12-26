import { action, observable } from 'mobx';
import { IFieldDescriptor } from '../../interfaces';
import * as FilterOperations from './FilterOperations';

export class QueryFilter {
    @observable field: IFieldDescriptor;
    @observable operation: FilterOperations.IFilterOperation;
    @observable operationList: FilterOperations.IFilterOperation[];
    @observable value?: number | string | string[];
    @observable value1?: string;
    @observable value2?: string;
    @observable enabled: boolean;

    constructor(field: IFieldDescriptor, value?: number | string | string[], value1?: string, value2?: string) {
        this.field = field;
        this.operationList = FilterOperations.default.filter(p => p.fieldType === field.type);
        this.operation = this.operationList[0];
        this.enabled = true;

        if (value) {
            this.value = value;
        }

        if (value1) {
            this.value1 = value1;
        }

        if (value2) {
            this.value2 = value2;
        }
    }

    @action
    public setField = (field: IFieldDescriptor) => {
        this.field = field;
        this.operationList = FilterOperations.default.filter(p => p.fieldType === field.type);
        this.operation = this.operationList[0];
    }

    @action
    public setValue = (value?: number | string | string[]) => {
        this.value = value;
    }

    @action
    public setValue1 = (value: string) => {
        this.value1 = value;
    }

    @action
    public setValue2 = (value: string) => {
        this.value2 = value;
    }

    @action
    public setOperation = (operation: FilterOperations.IFilterOperation) => {
        if (this.operationList.indexOf(operation) >= 0) {
            this.operation = operation;
        }
    }

    @action
    public toggle = () => {
        this.enabled = !this.enabled;
    }
}