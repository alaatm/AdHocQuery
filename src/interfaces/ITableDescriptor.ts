import IFieldDescriptor from './IFieldDescriptor';

export default interface ITableDescriptor {
    id: string;
    dbTable: string;
    text: string;
    fields: IFieldDescriptor[];
}

export function isTableDescriptor(object: {}): object is ITableDescriptor {
    return 'fields' in object;
}