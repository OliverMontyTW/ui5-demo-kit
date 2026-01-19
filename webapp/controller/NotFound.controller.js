sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5demokit.controller.NotFound", {
        onInit: function () {
        },

        onNavBack: function () {
            // var oRouter = this.getOwnerComponent().getRouter();
            // oRouter.navTo("Booking");

            const history = sap.ui.core.routing.History.getInstance();
            const previousHash = history.getPreviousHash();
            console.log("history: ", history);
            console.log("previous: ", previousHash);

            if (previousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouterFor().navTo("Booking", {}, true);
            }
        }

    });
});