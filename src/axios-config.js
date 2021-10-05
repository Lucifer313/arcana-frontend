import axios from 'axios'
import dotenv from 'dotenv'
import 'react-bootstrap'

dotenv.config()

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})
