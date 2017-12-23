import { IColumnDescriptor } from '../../interfaces';
import { observable } from 'mobx';

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
}