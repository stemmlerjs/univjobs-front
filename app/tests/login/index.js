
function login (email, password) {
  let bodyData = {
    email,
    password
  }

  const csrfToken = getCSRFToken();

  return axios({
    method: 'post',
    url: config.baseUrl + 'login/',
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": csrfToken
    },
    data: JSON.stringify(bodyData)
  })
}