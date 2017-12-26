import { action, computed, observable /*, runInAction*/ } from 'mobx';
import { ITableDescriptor } from '../interfaces';
import { Field, QueryFilterGroup } from './models';
const treeData = require('../test-data/fields.json') as ITableDescriptor[];

export default class Store {
    @observable allFields: ITableDescriptor[] = treeData;
    @observable selectedFields: Field[] = [];
    @observable queryFilterGroups: QueryFilterGroup[] = [];

    constructor() {
        const defaultFiled = this.allFields[0].fields[0];
        this.queryFilterGroups.push(new QueryFilterGroup(defaultFiled, this.queryFilterGroups, true));
    }

    @computed
    get sortedFields() {
        return this.selectedFields.filter(
            p => p.sorting && p.sorting.length && p.sorting !== 'None'
        ).sort((a, b) => a.sortingIndex - b.sortingIndex);
    }

    @computed
    get defaultQueryFilterGroup() {
        return this.queryFilterGroups[0];
    }

    @computed
    get topLevelQueryFilterGroups() {
        return this.queryFilterGroups.slice(1);
    }

    @action
    public clearSelectedFieldsList() {
        this.selectedFields = [];
    }

    @action
    public clearSortedFieldsList() {
        this.selectedFields.forEach(p => p.sorting = 'None');
    }

    @action
    public addToSelectedFields(keys: string[]) {
        const fieldList = this.allFields.reduce((c, t) => [...c, ...t.fields], []);
        const selectedKeys = this.selectedFields.map(p => p.id);

        for (let i = this.selectedFields.length - 1; i >= 0; i--) {
            if (keys.indexOf(this.selectedFields[i].id) < 0) {
                this.selectedFields.splice(i, 1);
            }
        }

        const self = this; // ???
        keys.forEach(k => {
            if (selectedKeys.indexOf(k) < 0) {
                const field = fieldList.filter(c => c.id === k)[0];
                if (field) {
                    const table = this.allFields.filter(p => p.id === field.pid)[0];
                    let addedField = new Field(field, table);
                    self.selectedFields.push(addedField);
                }
            }
        });
    }

    @action
    public switchSelectedFields(sourceIndex: number, targetIndex: number) {
        const source = this.selectedFields[sourceIndex];
        const target = this.selectedFields[targetIndex];

        this.selectedFields[sourceIndex] = target;
        this.selectedFields[targetIndex] = source;
    }

    @action
    public switchSortedFields(sourceIndex: number, targetIndex: number) {
        const source = this.sortedFields[sourceIndex];
        const target = this.sortedFields[targetIndex];

        source.sortingIndex = targetIndex;
        target.sortingIndex = sourceIndex;
    }

    @action
    public addQueryFilterGroup = () => {
        const defaultFiled = this.allFields[0].fields[0];
        this.queryFilterGroups.push(new QueryFilterGroup(defaultFiled, this.queryFilterGroups));
    }

    @action
    public removeQueryFilterGroup(group: QueryFilterGroup) {
        if (!group.isDefault) {
            this.queryFilterGroups.splice(this.queryFilterGroups.indexOf(group), 1);
        }
    }
}