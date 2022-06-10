import { shallowMount } from '@vue/test-utils';
import SignUpPage from '@/views/SignUpPage.vue';
import { DomCorrectnessTester, rule } from '../../helpers/dom-correctness-tester';

enum Selector {
  Title = 'h1.title',
  Login = '.form__login',
  Fullname = '.form__fullname',
  Pass = '.form__pass',
  PassAgain = '.form__pass-again',
  Submit = '.form__submit',
  Or = '.or',
}

describe('SignUpPage', () => {
  it('has required elements', () => {
    const wrapper = shallowMount(SignUpPage)
    new DomCorrectnessTester(wrapper)
      .addRules([
        rule(Selector.Title).text('Sign Up'),
        rule(Selector.Login).attr('placeholder', 'Login'),
        rule(Selector.Pass).attr('type', 'password').attr('placeholder', 'Password'),
        rule(Selector.PassAgain).attr('type', 'password').attr('placeholder', 'Password again'),
        rule(Selector.Submit),
        rule(Selector.Or)
      ])
      .test();
  });
})
