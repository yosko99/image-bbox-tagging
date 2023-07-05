/* eslint-disable multiline-ternary */
import React from 'react';

import LoadingPage from './LoadingPage';
import RenderMainPage from './render/RenderMainPage';
import { getAllProcessingTagsRoute } from '../constants/apiRoutes';
import useFetch from '../hooks/useFetch';

const MainPage = () => {
  const { isLoading, data } = useFetch(
    'processing_tags',
    getAllProcessingTagsRoute(),
    true
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return <RenderMainPage tags={data} />;
};

export default MainPage;
