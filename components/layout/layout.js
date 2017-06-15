import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import Head from 'components/layout/head';
import Icons from 'components/layout/icons';

export default function Layout(props) {
  const { title, children, className, description, queryParams } = props;

  const classNames = classnames({
    [className]: !!className
  });

  return (
    <div className={`l-page c-page ${classNames}`}>
      <Head
        title={title}
        description={description}
      />

      <Icons />

      <Header
        queryParams={queryParams}
      />

      <div className={`l-main ${classNames}`}>
        {children}
      </div>

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  queryParams: PropTypes.object,
  description: PropTypes.string,
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};

Layout.defaultProps = {
  description: 'Default description'
};
