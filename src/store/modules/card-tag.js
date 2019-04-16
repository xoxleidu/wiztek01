var panelButtonData = JSON.parse(localStorage.panelButtonData || "{}");
const panelButton = {
  state: {
    live: panelButtonData.live || {},
    trees: panelButtonData.trees || {}
  },
  mutations: {
    clearPanelButtonState() {
      localStorage.removeItem("panelButtonData");
    },
    getPanelButtonState(state, pbInfo) {
      state.live = pbInfo.live;
      state.trees = pbInfo.trees;
      localStorage.setItem("panelButtonData", JSON.stringify(state));
    }
    // getPanelButtonState() {
    //   localStorage.removeItem("wiztek");
    // }
  },
  actions: {
    // loginOut(context) {
    //   return new Promise(resolve => {
    //     context.commit("clearPanelButtonState");
    //     resolve();
    //   });
    // }
  },
  getters: {
    liveDatas: state => {
      return state.live;
    },
    treesDatas: state => {
      return !!state.trees;
    }
  }
};

export default panelButton;
