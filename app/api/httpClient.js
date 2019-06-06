import axios from 'axios'

const post = (url = '', data = '', config = {}) => {
  return axios.post(url, data, config)
}

const get = (url, config = '') => {
  return axios(url, config)
}

const put = (url = '', data = '', config = {}) => {
  return axios.put(url, data, config)
}

const patch = (url = '', data = '', config = {}) => {
  return axios.patch(url, data, config)
}

const del = (url = '', data = '', config = {}) => {
  return axios.delete(url, { headers: config.headers, data })
}

const HttpClient = {
  post,
  get,
  put,
  delete: del,
  patch
}

export { HttpClient }
