import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import RedirectButton from '@/components/RedirectButton.vue';
import HomePage from '@/views/HomePage.vue';
import RequestPage from '@/views/RequestPage.vue';
import ManagerPage from '@/views/ManagerPage.vue';

describe('RedirectButton', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: HomePage },
        { path: '/request', component: RequestPage },
        { path: '/manager', component: ManagerPage },
      ],
    });
  });

  it('redirects to the home page on button click', async () => {
    const wrapper = mount(RedirectButton, {
      props: { destination: '/' },
      global: { plugins: [router] },
    });

    await wrapper.find('button').trigger('click');
    await router.isReady();

    expect(router.currentRoute.value.path).toBe('/');
  });

  it('redirects to the request page on button click', async () => {
    const wrapper = mount(RedirectButton, {
      props: { destination: '/request' },
      global: { plugins: [router] },
    });

    await wrapper.find('button').trigger('click');
    await router.isReady();

    expect(router.currentRoute.value.path).toBe('/request');
  });

  it('redirects to the manager page on button click', async () => {
    const wrapper = mount(RedirectButton, {
      props: { destination: '/manager' },
      global: { plugins: [router] },
    });

    await wrapper.find('button').trigger('click');
    await router.isReady();

    expect(router.currentRoute.value.path).toBe('/manager');
  });

  it('throws an error when an invalid destination is provided', async () => {
    const routerOrigPush = router.push;
    const pushMock = jest.fn().mockImplementation(() => {
      throw new Error('Invalid route');
    });
  
    router.push = pushMock;
  
    const wrapper = mount(RedirectButton, {
      props: { destination: '/invalid' },
      global: { plugins: [router] },
    });
  
    try {
      await wrapper.find('button').trigger('click');
    } catch (error) {
      expect(error).toEqual(new Error('Invalid route'));
    }
  
    router.push = routerOrigPush;
  });
});