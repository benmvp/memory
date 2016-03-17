import React from 'react';
import classNames from 'classnames';
import './Box.scss';

export default class Square extends React.Component {
    static propTypes = {
        containerClass: React.PropTypes.string,
        containerStyle: React.PropTypes.object,
        color: React.PropTypes.string.isRequired,
        isActive: React.PropTypes.bool.isRequired,
        isPlaying: React.PropTypes.bool.isRequired,
        onSelect: React.PropTypes.func.isRequired
    }

    static defaultProps = {
        isActive: false,
        isPlaying: false
    }

    render() {
        let containerClass = classNames(
            'box',
            {
                'box--is-active': this.props.isActive,
                'box--is-playing': this.props.isPlaying
            },
            this.props.containerClass);
        let containerStyle = {
            ...this.props.containerStyle,
            background: `#${this.props.color}`
        };

        return (
            <div className={containerClass}
                style={containerStyle}
                onClick={this.props.onSelect} />
        );
    }
}
