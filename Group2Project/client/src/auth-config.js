let authConfig = {
  baseUrl: "http://localhost:5000/api",
  loginUrl: '/students/login',
  tokenName: 'token',
  authHeader: 'Authorization',
  authToken: '',
  logoutRedirect: '#/home'
}

export default authConfig;
