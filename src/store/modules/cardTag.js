import { getPanelButtonState } from "@/api/index";
var panelButtonData = JSON.parse(localStorage.panelButtonData || "{}");
const panelButton = {
  state: {
    live: panelButtonData.live || {},
    boxChecked: false,
    radioShow: false
  },
  mutations: {
    clearPanelButtonState() {
      localStorage.removeItem("panelButtonData");
    },
    PanelButtonState(state, pbInfo) {
      console.log("进入mutation", pbInfo);
      state.live = pbInfo;
      localStorage.setItem("panelButtonData", JSON.stringify(state));
    },

    handleRadioChecked(state, e, ids) {
      // this.optionsData.forEach(element => {
      //   if (element.id == id) {
      //     element.show = e;
      //     this.$emit("radioData", e, element);
      //   }
      // });
    }
  },
  actions: {
    actPanelButtonState({ commit }) {
      console.log("进入action");
      getPanelButtonState().then(res => {
        console.log("action中调用封装后的axios成功", res);
        commit("PanelButtonState", res.data);
      });
    }
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
