
import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'helpers/auth'
import eventEmitter from 'event-emitter'


const Listener = function () {}

eventEmitter(Listener.prototype)

const SkillsHelper = function () {

  // Private variables

  let timeout = null;
  const timeoutTime = 500;
  const listenerInstance = new Listener();

 /*
  * likeQuery
  * 
  * Performs a like query to find similar tags like this.
  */

  function likeQuery (text) {
    const accessToken = getAccessToken()

    if (text !== undefined && text !== null && text !== "") {
      axios({
        method: "POST",
        url: config.baseUrl + 'tags/skills',
        params: {
          like: text
        },
        headers: {
          'Authorization':  accessToken
        }
      })
      .then((response) => {
        console.log(response)

        listenerInstance.emit('data', response.data)
      })
      .catch((err) => {
        console.log(err)

        listenerInstance.emit('data', response.data)
      })
    }

    else {
      listenerInstance.emit('data', [])
    }
    
  }

  /*
   * Return Object
   */

  return {
    triggerLikeQuery: (value) => {

      if (timeout == null) {
        timeout = setTimeout(() => {
          likeQuery(value);
        }, timeoutTime)
      }

      else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          likeQuery(value)
        }, timeoutTime)
      }
        
    },
    listener: listenerInstance
  }
}

export default new SkillsHelper()