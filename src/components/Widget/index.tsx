import * as React from 'react';
import './index.css';

interface IProps {
    title: string;
    className?: string;
    children?: React.ReactNode;
}
export class Widget extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div className={`aq-widget ${this.props.className}`}>
                <div className="aq-widget-header">
                    <span className="aq-widget-title">{this.props.title}</span>
                </div>
                <div className="aq-widget-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Widget;