export interface IFilterOperation {
    fieldType: 'array' | 'bool' | 'date' | 'number' | 'string';
    name: string;
    inputCount: number;
    acceptedInputType?: string;
    middleText?: string;
    trailingText?: string;
    dividerBefore?: boolean;
}

const FilterOperations: IFilterOperation[] = [{
    fieldType: 'array',
    name: 'is in list',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'array',
    name: 'is not in list',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'array',
    name: 'is null',
    inputCount: 0,
    dividerBefore: true
}, {
    fieldType: 'bool',
    name: 'is true',
    inputCount: 0,
}, {
    fieldType: 'bool',
    name: 'is false',
    inputCount: 0,
}, {
    fieldType: 'date',
    name: 'is equal to',
    inputCount: 1,
    acceptedInputType: 'date'
}, {
    fieldType: 'date',
    name: 'is not equal to',
    inputCount: 1,
    acceptedInputType: 'date'
}, {
    fieldType: 'date',
    name: 'is after',
    inputCount: 1,
    acceptedInputType: 'date'
}, {
    fieldType: 'date',
    name: 'is after or equal to',
    inputCount: 1,
    acceptedInputType: 'date'
}, {
    fieldType: 'date',
    name: 'is before',
    inputCount: 1,
    acceptedInputType: 'date'
}, {
    fieldType: 'date',
    name: 'is before or equal to',
    inputCount: 1,
    acceptedInputType: 'date'
}, {
    fieldType: 'date',
    name: 'is between',
    inputCount: 2,
    acceptedInputType: 'date',
    middleText: 'and'
}, {
    fieldType: 'date',
    name: 'is within the current month',
    inputCount: 0,
    dividerBefore: true
}, {
    fieldType: 'date',
    name: 'is within past',
    inputCount: 1,
    acceptedInputType: 'number',
    trailingText: 'months'
}, {
    fieldType: 'date',
    name: 'is older than',
    inputCount: 1,
    acceptedInputType: 'number',
    trailingText: 'months'
}, {
    fieldType: 'date',
    name: 'is null',
    inputCount: 0,
    dividerBefore: true
}, {
    fieldType: 'number',
    name: 'is equal to',
    inputCount: 1,
    acceptedInputType: 'number'
}, {
    fieldType: 'number',
    name: 'is not equal to',
    inputCount: 1,
    acceptedInputType: 'number'
}, {
    fieldType: 'number',
    name: 'is greater than',
    inputCount: 1,
    acceptedInputType: 'number'
}, {
    fieldType: 'number',
    name: 'is greater than or equal to',
    inputCount: 1,
    acceptedInputType: 'number'
}, {
    fieldType: 'number',
    name: 'is less than',
    inputCount: 1,
    acceptedInputType: 'number'
}, {
    fieldType: 'number',
    name: 'is less than or equal to',
    inputCount: 1,
    acceptedInputType: 'number'
}, {
    fieldType: 'number',
    name: 'is null',
    inputCount: 0,
    dividerBefore: true
}, {
    fieldType: 'string',
    name: 'is equal to',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'is not equal to',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'starts with',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'does not start with',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'ends with',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'does not end with',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'contains',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'does not contain',
    inputCount: 1,
    acceptedInputType: 'string'
}, {
    fieldType: 'string',
    name: 'is null',
    inputCount: 1,
    acceptedInputType: 'string',
    dividerBefore: true
}];

export default FilterOperations;