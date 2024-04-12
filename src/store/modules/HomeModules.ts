import Link from "@/api/Link";
import apiUrl from "@/api/url";
const HomeModule: object = {
  state: {
    isFold: true,
    dialogFormVisible: false,
    updateData: {},
    listData: [],
  },
  mutations: {
    handleFold: function (state: any) {
      state.isFold = !state.isFold;
    },
    handleShow: function (state: any) {
      state.dialogFormVisible = !state.dialogFormVisible;
    },
    updateUpdateData: function (state: any, value: object) {
      state.updateData = value;
    },
    gainListData: function (state: any, value: []) {
      state.listData = value;
    },
  },
  actions: {
    UserUpdate_List: function (contect: any) {
      Link(apiUrl.userList, "get", {}, {}).then((success: any) => {
        console.log(success);
        contect.commit("gainListData", success.data);
      });
    },
  },
  getters: {},
};

export default HomeModule;
