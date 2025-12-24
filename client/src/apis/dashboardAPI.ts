import http from './httpClient'

const DashBoardAPI = {
  getDashBoard: () => http.get('/dashboard'),
}

export default DashBoardAPI
