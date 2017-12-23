import IColumnDescriptor from './IColumnDescriptor';

export default interface ITableDescriptor {
    id: string;
    dbTable: string;
    text: string;
    columns: IColumnDescriptor[];
}

export function isTableDescriptor(object: {}): object is ITableDescriptor {
    return 'columns' in object;
}