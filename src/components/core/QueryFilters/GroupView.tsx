import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { QueryFilterGroup } from '../../../Store/models';
import { EditableTextDropdown } from '../../helpers';
import Store from '../../../Store';
import FilterView from './FilterView';

interface IProps {
    store?: Store;
    group: QueryFilterGroup;
    parentGroup?: QueryFilterGroup;
}

@inject('store')
@observer
export class GroupView extends React.Component<IProps> {
    groupOperatorOptions = ['all', 'any', 'not all', 'none'];

    handleRemoveGroupClick = (group: QueryFilterGroup, parentGroup?: QueryFilterGroup) => {
        return () => {
            if (parentGroup) {
                parentGroup.removeGroup(group);
            } else {
                this.props.store!.removeQueryFilterGroup(group);
            }
        };
    }

    render(): JSX.Element {
        const store = this.props.store!;
        const { group, parentGroup } = this.props;

        return (
            <li className="group">
                <table><tbody><tr>
                    <td>
                        {group.isDefault && <span>select records where&nbsp;</span>}
                        <EditableTextDropdown
                            value={group.operator}
                            bold={true}
                            valueOptions={this.groupOperatorOptions}
                            onChange={group.setOperator}
                            disabled={!group.enabled}
                        />
                        &nbsp;of the following apply
                    </td>
                    <td className="last actions">
                        <div>
                            <a className={!group.enabled ? 'disabled' : ''}>
                                <span onClick={group.addFilter} className="icon-plus" title="Add filter" />
                            </a>

                            <a className={!group.enabled ? 'disabled' : ''}>
                                <span
                                    className="icon-sitemap"
                                    onClick={group.isDefault ? store.addQueryFilterGroup : group.addGroup}
                                    title="Add group"
                                />
                            </a>

                            <a>
                                <span
                                    onClick={group.toggle}
                                    className={group.enabled ? 'icon-toggle-on' : 'icon-toggle-off'}
                                    title={group.enabled ? 'Disable' : 'Enable'}
                                />
                            </a>

                            {!group.isDefault && (
                                <a>
                                    <span
                                        onClick={this.handleRemoveGroupClick(group, parentGroup)}
                                        className="icon-times"
                                        title="Remove"
                                    />
                                </a>
                            )}
                        </div>
                    </td>
                </tr></tbody></table>
                <ul>
                    {group.queryFilters.map((f, i) =>
                        <FilterView key={i} filter={f} group={group} />)}
                    {group.queryFilterGroups.map((g, i) =>
                        <GroupView key={i} group={g} parentGroup={group} />)}
                </ul>
            </li>
        );
    }
}

export default GroupView;