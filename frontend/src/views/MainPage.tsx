/* eslint-disable multiline-ternary */
import React from 'react';

import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import RenderMainPage from './render/RenderMainPage';
import { getAllProcessingTagsRoute } from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';

const MainPage = () => {
  const { isLoading, data, error } = useFetch(
    'processing_tags',
    getAllProcessingTagsRoute(),
    true
  );

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return <RenderMainPage tags={data} />;
};

export default MainPage;
