import axios from 'axios';
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
});