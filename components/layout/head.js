import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';
import styles from 'css/index.scss';

export default class Head extends React.Component {

  static getStyles() {
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#28bcd4">
        <meta name="theme-color" content="#ffffff">
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
