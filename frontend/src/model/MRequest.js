import axios from 'axios'

export default function useRequestModel() {
  const controller = new AbortController();

  const generatePrompt = async (requestMessage) => {
    const output = await axios.post('/generateprompt', { userRequest: requestMessage }, {
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

  const cancelRequest = () => {
    controller.abort()
  }

  return {
    generatePrompt,
    cancelRequest
  }
}