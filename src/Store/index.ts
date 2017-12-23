import { action, observable/*, runInAction*/ } from 'mobx';
import { ITableDescriptor } from '../interfaces';
import IColumnDescriptor from '../interfaces/IColumnDescriptor';
const treeData = require('../test-data/availableColumns.json') as ITableDescriptor[];

export default class Store {
    @observable availableColumns: ITableDescriptor[] = treeData;
    @observable selectedColumns: IColumnDescriptor[] = [];

    @action public selectColumns(keys: string[]) {
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
                    column.title = column.text;
                    self.selectedColumns.push(column);
                }
            }
        });
    }
}