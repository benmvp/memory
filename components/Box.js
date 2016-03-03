import React from 'react';
import classNames from 'classnames';
import './Box.scss';

export default class Square extends React.Component {
    static propTypes = {
        containerClass: React.PropTypes.string,
        containerStyle: React.PropTypes.object,
        color: React.PropTypes.string.isRequired
    }

    render() {
        let containerClass = classNames('Box', this.props.containerClass);
        let containerStyle = {
            ...this.props.containerStyle,
            background: `#${this.props.color}`
        }

        return (
            <div className={containerClass} style={containerStyle} />
        );
    }
}
