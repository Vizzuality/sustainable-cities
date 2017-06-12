import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function GridItem(props) {
  const isExternalLink = props.link && /^https?/.test(props.link);
  const linkAttributes = {
    href: props.link,
    rel: 'noopener',
    target: isExternalLink ? '_blank' : '_self'
  };

  return (
    <a // eslint-disable-line jsx-a11y/no-static-element-interactions
      {...(props.link ? linkAttributes : {})}
      role="link"
      onClick={() => props.onClick && props.onClick()}
      className="c-grid-item"
    >
      <div className="background" />
      <div
        className={classnames('image', `-${props.imageLayout}`)}
        style={props.image && { backgroundImage: `url(${props.image})` }}
      />
      <div className={classnames('title', { '-small': props.imageLayout === 'portrait' })}>{props.title}</div>
      { props.subtitle && <div className="subtitle">{props.subtitle}</div> }
    </a>
  );
}

GridItem.propTypes = {
  image: PropTypes.string,
  imageLayout: PropTypes.oneOf(['landscape', 'portrait']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string
};

GridItem.defaultProps = {
  imageLayout: 'landscape'
};
