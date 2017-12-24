import { action, computed, observable } from 'mobx';
import { QueryFilter } from './QueryFilter';
import { IFieldDescriptor } from '../../interfaces';

export class QueryFilterGroup {
    @observable queryFilterGroups: QueryFilterGroup[];
    @observable queryFilters: QueryFilter[];
    @observable operator: 'all' | 'any' | 'not all' | 'none';
    private defaultField: IFieldDescriptor;

    constructor(defaultField: IFieldDescriptor) {
        this.defaultField = defaultField;
        this.operator = 'all';
        this.addFilter();
    }

    @computed
    public get enabled() {
        return this.queryFilters.some(p => p.enabled);
    }

    @action
    public addGroup() {
        this.queryFilterGroups.push(new QueryFilterGroup(this.defaultField));
    }

    @action
    public addFilter() {
        this.queryFilters.push(new QueryFilter(this.defaultField));
    }

    @action
    public toggle() {
        if (this.enabled) {
            this.queryFilters.forEach(p => p.enabled = false);
        } else {
            this.queryFilters.forEach(p => p.enabled = true);
        }
    }
}