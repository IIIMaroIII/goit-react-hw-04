import React from 'react';
import { ProgressBar } from 'react-loader-spinner';
import css from './loader.module.css';

const Loader = () => {
  return (
    <ProgressBar
      wrapperClass={css.loader}
      barColor="#535bf2"
      borderColor="rgb(90, 90, 90)"
      ariaLabel="progress-bar-loading"
    />
  );
};

export default Loader;
