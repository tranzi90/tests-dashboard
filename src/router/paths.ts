const paths = {
  dashboard: '/',
  results: {
    path: '/results/:resultId',
    withId: (id: number) => `/results/${id}`
  },
  finalize: {
    path: '/finalize/:finalizeId',
    withId: (id: number) => `/finalize/${id}`
  }
};

export default paths;
