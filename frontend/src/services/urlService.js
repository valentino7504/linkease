import axios from 'axios';
import logger from '../utils/logger';

const baseUrl = '/api/v1';

const getStats = async () => {
  try {
    const res = await axios.get(`${baseUrl}/stats`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

const getUrl = async (shortId) => {
  try {
    const res = await axios.get(`${baseUrl}/shorturls/${shortId}`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

const create = async (obj) => {
  try {
    const res = await axios.post(`${baseUrl}/shorturls`, obj);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export default { getStats, getUrl, create };
