import { isValueEmpty } from "src/utils/HelperFunctions";
import {
  getJwtFromStorage,
  setJwtTokenInStorage,
  removeJwtTokenFromStorage,
} from "src/utils/LocalStorageUtils";
import { LoginService } from "src/services/LoginService";

function getInitialState() {
  const token = getJwtFromStorage();
  if (isValueEmpty(token)) {
    return { loggedIn: false, jwt: "" };
  } else {
    return { loggedIn: true, jwt: token };
  }
}

const loginService = new LoginService();

export const loginModule = {
  namespaced: true,
  state: getInitialState(),
  getters: {
    getLoginStatus(state) {
      return state;
    },
    getJwt(state) {
      return state.jwt;
    },
  },
  mutations: {
    loginSuccess(state, jwt) {
      state.loggedIn = true;
      state.jwt = jwt;
      setJwtTokenInStorage(jwt);
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.jwt = null;
      removeJwtTokenFromStorage();
    },
    logout(state) {
      state.loggedIn = false;
      state.jwt = null;
      removeJwtTokenFromStorage();
    },
  },
  actions: {
    async doLogin({ commit }, loginRequest) {
      try {
        console.log("login request");
        const response = await loginService.doLogin(loginRequest);
        const jwt = response.data.jwtToken;
        commit("loginSuccess", jwt);
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        commit("loginFailure");
        return Promise.reject(error);
      }
    },
    doLogout({ commit }) {
      commit("logout");
    },
  },
};
