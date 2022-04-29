/** Mock for localStorage. **/
const localStorageMock: Storage = (function () {
  let store: Record<string, any> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  } as Storage;
})();

export default localStorageMock

