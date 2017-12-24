import { action, computed, observable /*, runInAction*/ } from 'mobx';
import { ITableDescriptor } from '../interfaces';
import { Column } from './models';
const treeData = require('../test-data/fields.json') as ITableDescriptor[];

export default class Store {
    @observable allFields: ITableDescriptor[] = treeData;
    @observable selectedFields: Column[] = [];

    @computed
    get sortedFields() {
        return this.selectedFields.filter(
            p => p.sorting && p.sorting.length && p.sorting !== 'None'
        ).sort(p => p.sortingIndex);
    }

    @action
    public setSelectedFields(keys: string[]) {
        const availableColumns = this.allFields.reduce((c, t) => [...c, ...t.columns], []);
        const selectedKeys = this.selectedFields.map(p => p.id);

        for (let i = this.selectedFields.length - 1; i >= 0; i--) {
            if (keys.indexOf(this.selectedFields[i].id) < 0) {
                this.selectedFields.splice(i, 1);
            }
        }

        const self = this; // ???
        keys.forEach(k => {
            if (selectedKeys.indexOf(k) < 0) {
                const column = availableColumns.filter(c => c.id === k)[0];
                if (column) {
                    let addedColumn = new Column(column);
                    self.selectedFields.push(addedColumn);
                }
            }
        });

        // Update column orderings
        this.selectedColumns.forEach((c, i) => {
            c.order = i;
        });
    }
}