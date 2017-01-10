import axios from 'axios'
import config from 'config'

/* sendMessage 
 *  This sends the message from /contact-us
 *  to the backend api/contact
 *  
 *  @params(Object) - an object containing the following data below:
 *      @params(String) - userType
 *      @params(String) - userName
 *      @params(String) - userEmail
 *      @params(String) - userMessage
 *
 * */

export function sendMessage(data) {
    /*Pseudocode
     *  - get all the data
     *  - pass all the to an object called 'data'
     *  - POST the message to api/contact 
     *  */
	return axios({
		method: 'post',
		url: config.baseUrl + 'contact/',
		data: data
	})

}

