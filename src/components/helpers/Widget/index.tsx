import * as React from 'react';
import { Icon } from 'antd';
import IWidgetAction from './IWidgetAction';

import './index.css';

interface IProps {
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
        return (
            <div className="aq-widget">
                <div className="aq-widget-header">
                    <span className="aq-widget-title">{this.props.title}</span>
                    {this.props.actions && this.props.actions.map((a, i) => (
                        <div key={i} className="aq-widget-action">
                            <a className={!a.isEnabled ? 'disabled' : ''}>
                                <Icon type={a.icon} />&nbsp;
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