export const API_URL =
  process.env.REACT_APP_NODE_ENV === 'dev'
    ? 'http://localhost:5000/api'
    : 'https://xedike-api.herokuapp.com/api';
