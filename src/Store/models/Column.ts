import { IColumnDescriptor } from '../../interfaces';
import { action, observable } from 'mobx';

export class Column implements IColumnDescriptor {
    id: string;
    pid: string;
    dbField: string;
    text: string;
    type: string;
    systemType: string;
    valueOptions: string[] | null;

    @observable title: string;
    @observable sorting: string;
    @observable order: number;

    constructor(column: IColumnDescriptor) {
        this.id = column.id;
        this.pid = column.pid;
        this.dbField = column.dbField;
        this.text = column.text;
        this.type = column.type;
        this.systemType = column.systemType;
        this.valueOptions = column.valueOptions;

        this.title = column.text;
        this.sorting = 'None';
        this.order = 0;
    }

    @action
    public updateTitle = (value: string) => {
        this.title = value;
    }

    @action
    public updateSorting = (value: string) => {
        this.sorting = value;
    }

    @action
    public removeSorting = () => {
        this.sorting = 'None';
    }
}