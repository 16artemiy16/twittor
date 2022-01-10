import Vue from 'vue';

export default ({ $axios, $authService }: Vue) => {
  $axios.onRequest((config) => {
    const token = $authService.token();

    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });
}
