import { shallowMount } from '@vue/test-utils';
import SignInPage from '@/views/SignInPage.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { createTestingPinia } from '@pinia/testing';


describe('Login Page', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })
  it('has required elements', () => {
    const wrapper = shallowMount(SignInPage);

    // Title
    expect(wrapper.find('h1.title').exists()).toBeTruthy();
    expect(wrapper.find('h1.title').text()).toBe('Sign In');

    // Form
    expect(wrapper.find('.form__login').exists()).toBeTruthy();
    expect(wrapper.find('.form__pass').exists()).toBeTruthy();
    expect(
      wrapper.find('.form__pass').element.getAttribute('type')
    ).toBe('password');

    expect(wrapper.find('.form__submit').exists()).toBeTruthy();
    expect(wrapper.find('.form__submit').text()).toBe('Sign In');

    expect(wrapper.find('.or').exists()).toBeTruthy();
    expect(wrapper.find('.or').text()).toBe('OR');

    expect(wrapper.find('.signup-invite').exists()).toBeTruthy();
    expect(wrapper.find('.signup-invite .signup-invite__link').exists()).toBeTruthy();
    expect(wrapper.find('.signup-invite .signup-invite__link').text()).toBe('Sign Up');
  });
  it('send a correct signIn action on submitting form', async () => {
    const MOCKED_USER = 'user1';
    const MOCKED_PASSWORD = '111111';

    const wrapper = shallowMount(SignInPage, {
      global: {
        plugins: [createTestingPinia()]
      },
    });

    wrapper.setData({ login: ref(MOCKED_USER), password: ref(MOCKED_PASSWORD) })

    const authStore = useAuthStore();
    const signInSpy = jest.spyOn(authStore, 'signIn');

    const form = wrapper.find('.form');
    form.element.dispatchEvent(new Event('submit'));
    await wrapper.vm.$nextTick();

    expect(signInSpy).toBeCalledTimes(1);
    expect(signInSpy).toHaveBeenCalledWith(MOCKED_USER, MOCKED_PASSWORD);
  });
});
