sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5demokit.controller.Flights", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel("../model/data.json");
            this.getView().setModel(oModel);
        },

        onTilePress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();

            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("ui5demokit.view.FlightDetails", this);
                this.getView().addDependent(this._oDialog);
            }

            this._oDialog.bindElement(oContext.getPath());
            this._oDialog.open();
        },

        onCloseDialog: function () {
            this._oDialog.close();
        },

        onBookFlight: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext().getPath();

            var sEncodedPath = encodeURIComponent(sPath);

            this.getOwnerComponent()
                .getRouter()
                .navTo("Booking", {
                    query: sEncodedPath
                });
            
        },

        onSearch: function (oEvent) {
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            console.log(sQuery);

            if (sQuery && sQuery.length > 0) {
                var oFilter = new sap.ui.model.Filter("arrival", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(oFilter);
            }

            var oFlexBox = this.byId("flexBox");

            var oBinding = oFlexBox.getBinding("items");

            oBinding.filter(aFilters, "Application");
        }

    });
});