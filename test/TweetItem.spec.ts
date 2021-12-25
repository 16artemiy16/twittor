import { shallowMount, Wrapper } from '@vue/test-utils';
import { TweetI } from '~/interfaces/tweet.interface';
import TweetItem from '~/components/TweetItem/TweetItem.vue';
import ContainerActionsMenu from '~/components/ContainerActionsMenu.vue';

const TWEET: TweetI = {
  id: 'a',
  body: 'Hello! Welcome here!',
  user: {
    name: 'John',
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

  describe('should render text data correctly', () => {
    it('User name', () => {
      expect(wrapper.get('.user-name').text()).toBe(TWEET.user.name);
    })
  })
  it('test', () => {
    expect(true).toBe(true);
  });
});
