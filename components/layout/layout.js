import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import Head from 'components/layout/head';
import Icons from 'components/layout/icons';

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}
/* eslint-enable */

export default function Layout(props) {
  const { title, children, className } = props;

  const classNames = classnames({
    [className]: !!className
  });

  let { description } = props;
  if (!description) {
    description = 'Default description';
  }

  return (
    <div className={`l-page c-page ${classNames}`}>
      <Head
        title={title}
        description={description}
      />

      <Icons />

      <Header />

      <div className={`l-main ${classNames}`}>
        {children}
      </div>

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};
