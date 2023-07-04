const API_PREFIX = '/api/';
export const PUBLIC_IMAGES_PREFIX = '/public/';

export const getTagsRoute = () => API_PREFIX + 'tags';

export const getAllProcessingTagsRoute = (sort?: 'urgency' | 'date') =>
  `${getTagsRoute()}/processing?sort=${sort}`;

export const getProcessedTagsRoute = () => `${getTagsRoute()}/processed`;

export const getProcessingTagByIDRoute = (id: string) =>
  `${getTagsRoute()}/processing/${id}`;

export const completeTagRoute = (id: string) =>
  `${getTagsRoute()}/complete/${id}`;
