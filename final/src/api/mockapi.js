// src/api/mockapi.js
import axios from 'axios';

const BASE_URL = 'https://api-open.data.gov.sg/v2/real-time/api';
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI;