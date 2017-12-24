import * as React from 'react';
import { Icon } from 'antd';
import IWidgetAction from './IWidgetAction';

import './index.css';

interface IProps {
    icon?: string;
    title: string;
    actions?: IWidgetAction[];
    onActionClick?: (action: string) => void;
    className?: string;
    children?: React.ReactNode;
}
export class Widget extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    handleActionClick(action: string) {
        if (this.props.onActionClick) {
            this.props.onActionClick(action);
        }
    }

    render() {
        const { icon, title, actions } = this.props;

        return (
            <div className="aq-widget">
                <div className="aq-widget-header">
                    {icon && <Icon type={icon} style={{ fontSize: 18 }} />}
                    <span className="aq-widget-title">{title}</span>
                    {actions && actions.map((a, i) => (
                        <div key={i} className="aq-widget-action">
                            <a className={!a.isEnabled ? 'disabled' : ''}>
                                <Icon type={a.icon} />
                                <span onClick={this.handleActionClick.bind(this, a)}>{a.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
                <div className={`aq-widget-body ${this.props.className}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Widget;