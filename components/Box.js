import React from 'react';
import classNames from 'classnames';
import './Box.scss';

export default class Square extends React.Component {
    static propTypes = {
        containerClass: React.PropTypes.string,
        containerStyle: React.PropTypes.object
    }

    render() {
        let containerClass = classNames('Box', this.props.containerClass);

        return (
            <div className={containerClass} style={this.props.containerStyle} />
        );
    }
}
