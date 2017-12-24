import { IFieldDescriptor } from '../../interfaces';
import { action, observable } from 'mobx';

export class Field implements IFieldDescriptor {
    static _sortIndex = 0;
    id: string;
    pid: string;
    dbField: string;
    text: string;
    type: string;
    systemType: string;
    valueOptions: string[] | null;

    @observable title: string;
    @observable sorting: string;
    @observable sortingIndex: number;

    constructor(field: IFieldDescriptor) {
        this.id = field.id;
        this.pid = field.pid;
        this.dbField = field.dbField;
        this.text = field.text;
        this.type = field.type;
        this.systemType = field.systemType;
        this.valueOptions = field.valueOptions;

        this.title = field.text;
        this.sorting = 'None';
        this.sortingIndex = Field._sortIndex++;
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