import { action, observable } from 'mobx';
import { IFieldDescriptor } from '../../interfaces';
import * as FilterOperations from './FilterOperations';

export class QueryFilter {
    @observable field: IFieldDescriptor;
    @observable operation: string;
    @observable operationList: FilterOperations.IFilterOperation[];
    @observable value?: Date | number | string | string[];
    @observable value1?: Date;
    @observable value2?: Date;
    @observable enabled: boolean;

    constructor(field: IFieldDescriptor, value?: Date | number | string | string[], value1?: Date, value2?: Date) {
        this.field = field;
        this.operationList = FilterOperations.default.filter(p => p.fieldType === field.type);
        this.operation = this.operationList[0].name;
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
    public toggle() {
        this.enabled = !this.enabled;
    }
}