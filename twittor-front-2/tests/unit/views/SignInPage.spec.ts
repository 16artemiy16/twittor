import { shallowMount } from '@vue/test-utils';
import SignInPage from '@/views/SignInPage.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { createTestingPinia } from '@pinia/testing';
import { DomCorrectnessTester, rule } from '../../helpers/dom-correctness-tester';

enum Selector {
  Title = 'h1.title',
  Login = '.form__login',
  Password = '.form__pass',
  Submit = '.form__submit',
  Or = '.or',
  SignUpInvite = '.signup-invite',
  SignUpInviteLink = '.signup-invite .signup-invite__link',
}

describe('SignInPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })
  it('has required elements', () => {
    const wrapper = shallowMount(SignInPage);
    new DomCorrectnessTester(wrapper).addRules([
      rule(Selector.Title).text('Sign In'),
      rule(Selector.Login),
      rule(Selector.Password).attr('type', 'password'),
      rule(Selector.Submit).text('Sign In'),
      rule(Selector.Or).text('OR'),
      rule(Selector.SignUpInvite),
      rule(Selector.SignUpInviteLink).text('Sign Up'),
    ]).test();
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
