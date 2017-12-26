import { action, computed, observable } from 'mobx';
import { QueryFilter } from './QueryFilter';
import { IFieldDescriptor } from '../../interfaces';

export class QueryFilterGroup {
    @observable queryFilterGroups: QueryFilterGroup[] = [];
    @observable queryFilters: QueryFilter[] = [];
    @observable operator: 'all' | 'any' | 'not all' | 'none';
    isDefault: boolean;
    parent: QueryFilterGroup | QueryFilterGroup[];
    private defaultField: IFieldDescriptor;

    constructor(
        defaultField: IFieldDescriptor,
        parentGroup: QueryFilterGroup | QueryFilterGroup[],
        isDefault: boolean = false) {
        this.defaultField = defaultField;
        this.operator = 'all';
        this.isDefault = isDefault;
        this.parent = parentGroup;

        if (!isDefault) {
            this.addFilter();
        }
    }

    @computed
    public get enabled() {
        return this.queryFilters.length === 0
            ? true
            : this.queryFilters.some(p => p.enabled);
    }

    @action
    public addGroup = () => {
        this.queryFilterGroups.push(new QueryFilterGroup(this.defaultField, this));
    }

    @action
    public removeGroup(group: QueryFilterGroup) {
        this.queryFilterGroups.splice(this.queryFilterGroups.indexOf(group), 1);
    }

    @action
    public addFilter = () => {
        this.queryFilters.push(new QueryFilter(this.defaultField));
    }

    @action
    public removeFilter(filter: QueryFilter) {
        this.queryFilters.splice(this.queryFilters.indexOf(filter), 1);
        if (this.queryFilters.length === 0 && !this.isDefault) {
            if (this.parent instanceof Array) {
                const index = this.parent.indexOf(this);
                this.parent.splice(index, 1);
            } else {
                this.parent.removeGroup(this);
            }
        }
    }

    @action
    public toggle = () => {
        if (this.enabled) {
            this.queryFilters.forEach(p => p.enabled = false);
        } else {
            this.queryFilters.forEach(p => p.enabled = true);
        }
    }

    @action
    public setOperator = (operator: 'all' | 'any' | 'not all' | 'none') => {
        this.operator = operator;
    }
}