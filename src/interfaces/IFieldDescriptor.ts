export default interface IFieldDescriptor {
    id: string;
    pid: string;
    dbField: string;
    text: string;
    type: string;
    systemType: string;
    valueOptions: string[] | null;
}

export function isFieldDescriptor(object: {}): object is IFieldDescriptor {
    return 'systemType' in object;
}