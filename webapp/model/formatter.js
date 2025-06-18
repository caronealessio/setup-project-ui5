sap.ui.define([], function () {
  "use strict";

  return {
    convertDateInUTCRome: function (oDate) {
      if (!oDate) {
        return null;
      }

      if (!(oDate instanceof Date)) {
        oDate = new Date(oDate);
      }

      const day = String(oDate.getDate()).padStart(2, "0");
      const month = String(oDate.getMonth() + 1).padStart(2, "0");
      const year = oDate.getFullYear();

      const utcDateString = `${year}-${month}-${day}T00:00:00.000+00:00`;
      return new Date(utcDateString);
    },

    convertRecursivelyInUTCRome: function (input) {
      if (!input) {
        return input;
      }

      if (input instanceof Date) {
        return this.convertDateInUTCRome(input);
      }

      if (Array.isArray(input)) {
        return input.map((item) => this.convertRecursivelyInUTCRome(item));
      }

      if (typeof input === "object" && input !== null) {
        const result = {};
        for (const key in input) {
          if (Object.prototype.hasOwnProperty.call(input, key)) {
            result[key] = this.convertRecursivelyInUTCRome(input[key]);
          }
        }
        return result;
      }

      return input;
    },
  };
});
