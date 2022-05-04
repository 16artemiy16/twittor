import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/store/auth';

describe('Auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })
  describe('state', () => {
    it('has a correct initial value', () => {
      expect(useAuthStore().$state).toEqual({
        userInfo: null,
      });
    });
  })
});
