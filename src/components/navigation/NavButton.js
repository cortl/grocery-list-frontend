import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class NavButton extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        let classNames = ['nav-link'];
        if (this.props.active) {
            classNames.push('active');
        }
        return (
            <a className={classNames.join(' ')} href='#' // eslint-disable-line
               onClick={() => this.context.router.history.push(this.props.location)}>{this.props.text}</a>
        );
    }
}

NavButton.defaultProps = {
    active: false,
    location: '',
    text: ''
};

NavButton.propTypes = {
    active: PropTypes.bool,
    location: PropTypes.string,
    text: PropTypes.string
};
