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
