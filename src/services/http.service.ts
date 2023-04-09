import axios from 'axios';

export const httpAccessTokenService = axios.create({
  baseURL: 'http://84.201.188.117:5021/',
  headers: {AccessKey: '891cf53c-01fc-4d74-a14c-592668b7a03c'}
});

export const httpCheckBonusesService = axios.create({
  baseURL: 'http://84.201.188.117:5003/',
  headers: {AccessKey: '891cf53c-01fc-4d74-a14c-592668b7a03c'}
});

