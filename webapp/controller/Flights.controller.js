sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5demokit.controller.Flights", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel("../model/data.json");
            this.getView().setModel(oModel);
        }

    });
});