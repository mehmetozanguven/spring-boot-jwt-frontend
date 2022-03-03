import { boot } from "quasar/wrappers";
import axios from "axios";
/*
A common use case for Quasar applications is to run code
before the root Vue app instance is instantiated,
like injecting and initializing your own dependencies (examples: Vue components, libraries…)
or simply configuring some startup code of your app.
*/

const api = axios.create({ baseURL: "http://localhost:8080/api" });
api.defaults.timeout = 500;
// create axios interceptor for the baseUrl ..8080/api
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("axios: " + config.url);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
