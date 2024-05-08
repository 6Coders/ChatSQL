import axios from '@/axios'

/**
 * useRequestModel returns an object with two methods: generatePrompt and cancelRequest.
 * 
 * @returns {Object} An object with two methods: generatePrompt and cancelRequest.
 */
export default function useRequestModel() {
  // controller is an instance of AbortController, which can be used to cancel HTTP requests.
  let controller

  /**
   * generatePrompt sends a POST request to '/generateprompt' with a user request message.
   * 
   * @param {string} requestMessage - The user request message.
   * @returns {Promise<string>} A promise that resolves with the result of the request or an error message.
   */
  const generatePrompt = async (requestMessage) => {
    if (controller) controller.abort();
    controller = new AbortController();
    const formData = new FormData();
    formData.append('userRequest', requestMessage);
    const output = await axios.post('/generatePrompt', formData, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      if (response.data.result === '') {
        return 'Errore: non è stato caricato alcun dizionario';
      } else {
        return response.data.result;
      }
    }).catch((error) => {
      if (error.response) {
        return error.message;
      } else {
        return error.message;
      }
    });
    controller = undefined
    return output;
  }

  const getSelectedDictionary = async () => {
    if (controller) controller.abort();
    controller = new AbortController();
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
    controller = undefined
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