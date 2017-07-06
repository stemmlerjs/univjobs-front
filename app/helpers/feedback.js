
import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'helpers/auth'
import { sanitize } from 'helpers/utils'

/*
 * submitFeedbackForm
 * 
 * @description Submits the feedback form. If the user chose to take a 
 * screenshot, it should base 64 encode an image and send that along with the request,
 * 
 */

export function submitFeedbackForm (title, description, screenshot) {
  const accessToken = getAccessToken()
  let formData = new FormData();

  title = sanitize(title)
  description = sanitize(description)

  formData.append('title', title)
  formData.append('description', description)
  
  if (screenshot !== null) {
    formData.append('screenshot', screenshot)
  }

	return axios({
		method: 'post',
		url: config.baseUrl + 'feedback',
		headers: {
			'Authorization':  accessToken
		},
    data: formData
	})
}
