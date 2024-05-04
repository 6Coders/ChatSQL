import axios from '@/axios';
import useRequestModel from '@/model/MRequest'
import MockAdapter from 'axios-mock-adapter'

describe('useRequestModel', () => {
  it('returns data when request is successful', async () => {
    const { generatePrompt } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onPost('/generateprompt').reply(200, { result: 'A fact' });

    const data = await generatePrompt('A message');

    expect(data).toEqual('A fact');
  });

  it('returns "Stopped" when request is cancelled', async () => {
    const { generatePrompt } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onPost('/generateprompt').abortRequest();

    const data = await generatePrompt('A message');

    expect(data).toEqual('Request aborted');
  });

  it('returns "Error" when there is a network error', async () => {
    const { generatePrompt } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onPost('/generateprompt').networkError();

    const data = await generatePrompt('A message');

    expect(data).toEqual('Network Error');
  });

  it('should handle error with response', async () => {
      const { generatePrompt } = useRequestModel();
      const mock = new MockAdapter(axios);
      mock.onPost('/generateprompt').reply(404);

    const result = await generatePrompt('A message');

    expect(result).toBe('Request failed with status code 404');
  });

  it('should handle error with request', async () => {
    const { generatePrompt } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onPost('/generateprompt').replyOnce(500);

    const result = await generatePrompt('A message');

    expect(result).toBe('Request failed with status code 500');
  });

  it('returns selected dictionary when request is successful', async () => {
    const { getSelectedDictionary } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onGet('/selected').reply(200, { result: 'Dictionary' });

    const data = await getSelectedDictionary();

    expect(data).toEqual('Dictionary');
  });

  it('returns "Stopped" when request is cancelled', async () => {
    const { getSelectedDictionary } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onGet('/selected').abortRequest();

    const data = await getSelectedDictionary();

    expect(data).toEqual('Request aborted');
  });

  it('returns "Error" when there is a network error', async () => {
    const { getSelectedDictionary } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onGet('/selected').networkError();

    const data = await getSelectedDictionary();

    expect(data).toEqual('Network Error');
  });

  it('should handle error with response', async () => {
      const { getSelectedDictionary } = useRequestModel();
      const mock = new MockAdapter(axios);
      mock.onGet('/selected').reply(404);

    const result = await getSelectedDictionary();

    expect(result).toBe('Request failed with status code 404');
  });

  it('should handle error with request', async () => {
    const { getSelectedDictionary } = useRequestModel();
    const mock = new MockAdapter(axios);
    mock.onGet('/selected').replyOnce(500);

    const result = await getSelectedDictionary();

    expect(result).toBe('Request failed with status code 500');
  });
});