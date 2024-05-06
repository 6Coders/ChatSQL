import axios from 'axios'

export default function useRequestModel() {
  const controller = new AbortController();

  const generatePrompt = async (requestMessage) => {
    const formData = new FormData();
    formData.append('userRequest', requestMessage);
    const output = await axios.post('http://localhost:5000/generatePrompt', formData, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
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