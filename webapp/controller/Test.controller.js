sap.ui.define(["./BaseController"], (BaseController) => {
  "use strict";

  return BaseController.extend("appnamespace.controller.Test", {
    onInit() {
      this.getRouter().getRoute("test").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: async function () {
      console.log(dayjs().format());
    },
  });
});
