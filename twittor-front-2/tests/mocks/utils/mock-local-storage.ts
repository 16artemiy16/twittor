import localStorageMock from '../local-storage.mock';

/**
 * Mocks localStorage using {@link localStorageMock}.
 */
const mockLocalStorage = () => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
};

export default mockLocalStorage;
