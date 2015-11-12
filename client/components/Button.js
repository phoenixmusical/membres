import React from 'react';

export default class Button extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick (event) {
        event.preventDefault();
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        }
    }
    render () {
        const props = this.props;
        const classes = props.className ? props.className.split(" ") : [];
        classes.push("btn");
        if (props.type) {
            classes.push("btn-" + props.type);
        } else {
            classes.push("btn-default");
        }
        if (props.size) {
            classes.push("btn-" + props.size);
        }
        if (props.disabled) {
            classes.push("disabled");
        }
        return (
            <a href="#" className={classes.join(" ")} onClick={this.onClick}>
                {this.props.children}
            </a>
        );
    }
}
