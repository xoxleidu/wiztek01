import { resolve } from "upath";

var userData = JSON.parse(localStorage.wiztek || "{}");
const user = {
  state: {
    token: userData.token || "",
    userId: userData.userId || ""
  },
  mutations: {
    loginIn(state, userInfo) {
      state.userId = userInfo.userId;
      state.token = userInfo.token;
      localStorage.setItem("wiztek", JSON.stringify(state));
    },
    clearLogin() {
      localStorage.removeItem("wiztek");
    }
  },
  actions: {
    loginOut(context) {
      return new Promise(resolve => {
        context.commit("clearLogin");
        resolve();
      });
    }
  },
  getters: {
    userId: state => {
      return state.userId;
    },
    isLogin: state => {
      return !!state.token;
    }
  }
};

export default user;
