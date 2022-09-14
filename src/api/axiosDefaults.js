import axios from 'axios'

axios.defaults.baseURL = 'https://autolovers.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multupart/form-data'
axios.defaults.withCredentials = true