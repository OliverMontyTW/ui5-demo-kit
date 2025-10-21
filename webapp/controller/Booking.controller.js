sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5demokit.controller.Booking", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel("../model/data.json");
            this.getView().setModel(oModel);
        },

        onClearBooking: function (){
            this.getView().byId("inputFullName").setValue("");
            this.getView().byId("inputPhone").setValue("");
            this.getView().byId("inputEmail").setValue("");
            this.getView().byId("inputAddress").setValue("");
            this.getView().byId("inputDateRange").setValue("");
            this.getView().byId("selectCabinClass").setValue("Economy");
            this.getView().byId("selectAirport").setValue("");
        },

        onSubmitBooking: function(){
           
        }

    });
});