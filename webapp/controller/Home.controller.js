sap.ui.define(["./BaseController"], (BaseController, entityUtils) => {
  "use strict";

  return BaseController.extend("appnamespace.controller.Home", {
    onInit() {
      this.getRouter().getRoute("home").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: async function () {},
  });
});
