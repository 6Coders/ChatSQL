import axios from '@/axios'

/**
 * useRequestModel returns an object with two methods: generatePrompt and cancelRequest.
 * 
 * @returns {Object} An object with two methods: generatePrompt and cancelRequest.
 */
export default function useRequestModel() {
  // controller is an instance of AbortController, which can be used to cancel HTTP requests.
  const controller = new AbortController();

  /**
   * generatePrompt sends a POST request to '/generateprompt' with a user request message.
   * 
   * @param {string} requestMessage - The user request message.
   * @returns {Promise<string>} A promise that resolves with the result of the request or an error message.
   */
  const generatePrompt = async (requestMessage) => {
    const output = await axios.post('/generatePrompt', { userRequest: requestMessage }, {
      signal: controller.signal
    }).then(function (response) {
      return response.data.result;
    }).catch((error) => {
      if (error.response) {
        return error.message;
      } else {
        return error.message;
      }
    });

    return output;
  }

  const getSelectedDictionary = async () => {
    const output = await axios.get('/selected', {
      signal: controller.signal
    }).then(function (response) {
      return response.data.result;
    }).catch((error) => {
      if (error.response) {
        return error.message;
      } else {
        return error.message;
      }
    });

    return output;
  }

  /**
   * cancelRequest cancels the current HTTP request using the AbortController controller.
   */
  const cancelRequest = () => {
    controller.abort()
  }

  return {
    generatePrompt,
    getSelectedDictionary,
    cancelRequest
  }
}