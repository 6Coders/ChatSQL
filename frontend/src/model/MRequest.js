import axios from 'axios'

export default function useRequestModel() {
  let cancelTokenSource;

  const testApiCall = async () => {
    cancelTokenSource = axios.CancelToken.source();
    try {
      const response = await axios.get('https://catfact.ninja/fact', {
        cancelToken: cancelTokenSource.token
      })
      return response.data.fact
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message)
        return 'Stopped'
      } else {
        return 'Error'
      }
    }
  }

  const generatePrompt = (requestMessage) => {
    cancelTokenSource = axios.CancelToken.source();
    return new Promise((resolve, reject) => {
      axios.post('/generateprompt', { userRequest: requestMessage }, {
        cancelToken: cancelTokenSource.token
      })
        .then(response => {
          resolve(response.data.result)
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            reject('Request canceled')
          } else {
            reject(error)
          }
        })
    })
  }

  const cancelRequest = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request cancelled.');
    }
  }

  return {
    testApiCall,
    generatePrompt,
    cancelRequest
  }
}