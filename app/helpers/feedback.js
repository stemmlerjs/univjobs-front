
import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'helpers/auth'
import { sanitize } from 'helpers/utils'

export function submitFeedbackForm (title, description) {
  const accessToken = getAccessToken()

  title = sanitize(title)
  description = sanitize(description)

	return axios({
		method: 'post',
		url: config.baseUrl + 'feedback',
		headers: {
			'Authorization':  accessToken
		},
    data: {
      title,
      description
    }
	})
}
