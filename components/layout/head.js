import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';
import styles from 'css/index.scss';

import Package from '../../package.json';

export default class Head extends React.Component {

  static getStyles() {
    if (process.env.NODE_ENV === 'production') {
      // In production, serve pre-built CSS file from /assets/{version}/main.css
      return <link rel="stylesheet" type="text/css" href={`/assets/${Package.version}/index.css`} />;
    }
    // In development, serve CSS inline (with live reloading) with webpack
    // NB: Not using dangerouslySetInnerHTML will cause problems with some CSS
    // eslint-disable-next-line react/no-danger
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
  }

  render() {
    const { title, description } = this.props;

    return (
      <HeadNext>
        <title>{title} | Sustainable Cities</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vizzuality" />
        <link href="https://fonts.googleapis.com/css?family=Yantramanav:100,300,400" rel="stylesheet" />
        {Head.getStyles()}
        {/* Do we need any polyfills? */}
        {/* <script src="https://cdn.polyfill.io/v2/polyfill.min.js" /> */}
      </HeadNext>
    );
  }

}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
