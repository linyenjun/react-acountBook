import axios from 'axios';

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5c08f494ea3172001389ccc1.mockapi.io"

export const getAll = () =>
axios.get(`${api}/records`)

export const create = (body) =>
axios.post(`${api}/records`,body)


export const update = (id, body) =>
axios.put(`${api}/records/${id}`,body)

export const remove = (id) =>
axios.delete(`${api}/records/${id}`)