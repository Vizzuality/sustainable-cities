import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';

export default function GridItem(props) {
  // If the link is a string, this means that it is external
  const isExternalLink = typeof props.link === 'string';
  const { background, icon } = props.placeholder || {};

  const linkAttributes = isExternalLink
    ? { href: props.link, rel: 'noreferrer', target: '_blank' }
    : {};

  const content = (
    <a // eslint-disable-line jsx-a11y/no-static-element-interactions
      {...linkAttributes}
      role="link"
      onClick={() => props.onClick && props.onClick()}
      className="c-grid-item"
    >
      <div className="background" />
      <div
        className={classnames('image', `-${props.imageLayout}`)}
        style={{
          backgroundImage: props.image ? `url(${props.image})` : null,
          backgroundColor: !props.image && background ? background : null
        }}
      >
        {(!props.image && icon)
          && <svg className={`icon ${icon}`}>
            <use xlinkHref={`#${icon}`} /></svg>}
      </div>
      <h4 className="c-title -dark -fw-light title">{props.title}</h4>
      { props.subtitle && <h5 className="c-title -gray-light -uppercase subtitle">{props.subtitle}</h5> }
    </a>
  );

  if (!props.link || isExternalLink) {
    return content;
  }

  return (
    <Link route={props.link.route} params={props.link.params}>
      {content}
    </Link>
  );
}

GridItem.propTypes = {
  image: PropTypes.string,
  imageLayout: PropTypes.oneOf(['landscape', 'portrait']),
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.shape({
    background: PropTypes.string,
    icon: PropTypes.string
  }),
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      params: PropTypes.object
    })
  ])
};

GridItem.defaultProps = {
  imageLayout: 'landscape',
  placeholder: {
    background: '',
    icon: ''
  }
};
