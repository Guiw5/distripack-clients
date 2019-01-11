import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:55337/api',
  //baseURL: 'http://ec2-18-220-58-115.us-east-2.compute.amazonaws.com/api',
  responseType: 'json'
})

export { http }
