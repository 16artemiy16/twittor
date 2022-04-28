import { shallowMount } from '@vue/test-utils';
import SignInPage from '@/views/SignInPage.vue';

describe('Login Page', () => {
  it('has required elements', () => {
    const wrapper = shallowMount(SignInPage);

    // Title
    expect(wrapper.find('h1.title').exists()).toBeTruthy();
    expect(wrapper.find('h1.title').text()).toBe('Sign In');

    // Form
    expect(wrapper.find('input.form__login').exists()).toBeTruthy();
    expect(wrapper.find('input.form__pass').exists()).toBeTruthy();
    expect(
      wrapper.find('input.form__pass').element.getAttribute('type')
    ).toBe('password');

    expect(wrapper.find('button.form__submit').exists()).toBeTruthy();
    expect(wrapper.find('button.form__submit').text()).toBe('Sign In');
  });
});
