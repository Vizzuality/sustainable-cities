import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';

export default function Button(props) {
  const classes = classnames({
    'c-button': true,
    '-primary': !props.secondary,
    '-secondary': props.secondary,
    '-inverse': props.inverse,
    '-disabled': props.disabled
  });

  if (props.link) {
    // If the link is a string, this means that it is external
    const isExternalLink = typeof props.link === 'string';

    const linkAttributes = isExternalLink
      ? { href: props.link, rel: 'noreferrer', target: '_blank' }
      : {};

    const content = (
      <a // eslint-disable-line jsx-a11y/no-static-element-interactions
        {...linkAttributes}
        role="link"
        className={classes}
      >
        {props.children}
      </a>
    );

    if (isExternalLink) {
      return content;
    }

    return (
      <Link route={props.link.route} params={props.link.params}>
        {content}
      </Link>
    );
  }

  // We render a real button
  return (
    <button
      className={classnames(classes)}
      type="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      params: PropTypes.object
    })
  ]),
  onClick: PropTypes.func,
  secondary: PropTypes.bool,
  inverse: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  secondary: false,
  inverse: false,
  disabled: false
};
