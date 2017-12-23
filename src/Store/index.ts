import { action, computed, observable/*, runInAction*/ } from 'mobx';
import { ITableDescriptor } from '../interfaces';
import { Column } from './models';
const treeData = require('../test-data/availableColumns.json') as ITableDescriptor[];

export default class Store {
    @observable availableColumns: ITableDescriptor[] = treeData;
    @observable selectedColumns: Column[] = [];

    @computed get sortedColumns() {
        return this.selectedColumns.filter(
            p => p.sorting && p.sorting.length && p.sorting !== 'None'
        );
    }

    @action
    public selectColumns(keys: string[]) {
        const availableColumns = this.availableColumns.reduce((c, t) => [...c, ...t.columns], []);
        const selectedKeys = this.selectedColumns.map(p => p.id);

        for (let i = this.selectedColumns.length - 1; i >= 0; i--) {
            if (keys.indexOf(this.selectedColumns[i].id) < 0) {
                this.selectedColumns.splice(i, 1);
            }
        }

        const self = this; // ???
        keys.forEach(k => {
            if (selectedKeys.indexOf(k) < 0) {
                const column = availableColumns.filter(c => c.id === k)[0];
                if (column) {
                    const addedColumn = { ...column, title: column.text, sorting: 'None', order: 0 } as Column;
                    self.selectedColumns.push(addedColumn);
                }
            }
        });

        // Update column orderings
        this.selectedColumns.forEach((c, i) => {
            c.order = i;
        });
    }

    @action
    public updateTitleText(id: string, value: string) {
        this.selectedColumns.filter(p => p.id === id)[0].title = value;
    }

    @action
    public updateSorting(id: string, value: string) {
        this.selectedColumns.filter(p => p.id === id)[0].sorting = value;
    }
}