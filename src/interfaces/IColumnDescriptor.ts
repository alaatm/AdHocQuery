export default interface IColumnDescriptor {
    id: string;
    pid: string;
    dbField: string;
    text: string;
    type: string;
    systemType: string;
    valueOptions: string[] | null;

    title: string;
    sorting: string;
}

export function isColumnDescriptor(object: {}): object is IColumnDescriptor {
    return 'systemType' in object;
}