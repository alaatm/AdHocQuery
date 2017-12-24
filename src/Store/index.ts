import { action, computed, observable /*, runInAction*/ } from 'mobx';
import { ITableDescriptor } from '../interfaces';
import { Field } from './models';
const treeData = require('../test-data/fields.json') as ITableDescriptor[];

export default class Store {
    @observable allFields: ITableDescriptor[] = treeData;
    @observable selectedFields: Field[] = [];

    @computed
    get sortedFields() {
        return this.selectedFields.filter(
            p => p.sorting && p.sorting.length && p.sorting !== 'None'
        ).sort((a, b) => a.sortingIndex - b.sortingIndex);
    }

    @action
    public setSelectedFields(keys: string[]) {
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
                const column = fieldList.filter(c => c.id === k)[0];
                if (column) {
                    let addedColumn = new Field(column);
                    self.selectedFields.push(addedColumn);
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
}