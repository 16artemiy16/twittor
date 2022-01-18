import { shallowMount, Wrapper } from '@vue/test-utils';
import { TweetI } from '~/interfaces/tweet.interface';
import TweetItem from '~/components/TweetItem/TweetItem.vue';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';

const TWEET: TweetI = {
  id: 'a',
  body: 'Hello! Welcome here!',
  created: 1642140791026.572,
  user: {
    id: 1,
    fullname: 'John',
    login: 'john',
    img: 'http://john.com/my-img.png',
  },
  likes: {
    total: 15,
    isLikedByMe: false,
  },
}

describe('TweetItem', () => {
  let wrapper!: Wrapper<TweetItem>;

  beforeEach(() => {
    wrapper = shallowMount(TweetItem, {
      propsData: {
        tweet: TWEET,
      },
      components: {
        ContainerActionsMenu,
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  });

  describe('should render data correctly', () => {
    const cases = [
      { name: 'User name', selector: '.user-name', expected: TWEET.user.fullname },
      { name: 'User login', selector: '.user-login', expected: TWEET.user.login },
      { name: 'Tweet body', selector: '.tweet__body', expected: TWEET.body },
      { name: 'User image', selector: '.user-img', expected: TWEET.user.img, attr: 'src' },
      // TODO: posted date is mocked for now
    ]
    cases.forEach(({ name, selector, expected, attr }) => {
      it(name, () => {
        const el = wrapper.get(selector);
        const value = attr ? el.attributes(attr) : el.text();
        expect(value).toBe(expected);
      });
    });
  });
});
