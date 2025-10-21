sap.ui.define([
    'sap/m/MessageToast',
    "sap/ui/core/mvc/Controller"
], (MessageToast, Controller) => {
    "use strict";

    return Controller.extend("ui5demokit.controller.Booking", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel("../model/data.json");
            this.getView().setModel(oModel);
        },

        onClearBooking: function () {
            this.getView().byId("inputFullName").setValue("");
            this.getView().byId("inputPhone").setValue("");
            this.getView().byId("inputEmail").setValue("");
            this.getView().byId("inputAddress").setValue("");
            this.getView().byId("inputDateRange").setValue("");
            this.getView().byId("selectCabinClass").setValue("Economy");
            this.getView().byId("selectAirport").setValue("");
        },

        onSubmitBooking: function () {
            var name = this.getView().byId("inputFullName").getValue();
            var phone = this.getView().byId("inputPhone").getValue();
            var email = this.getView().byId("inputEmail").getValue();
            var address = this.getView().byId("inputAddress").getValue();
            var dateRange = this.getView().byId("inputDateRange").getValue();
            var cabinClass = this.getView().byId("selectCabinClass").getSelectedKey();
            var airport = this.getView().byId("selectAirport").getSelectedKey();

            var oModel = this.getView().getModel();

            if (this._editPath) {

                oModel.setProperty(this._editPath + "/fullName", name);
                oModel.setProperty(this._editPath + "/phone", phone);
                oModel.setProperty(this._editPath + "/email", email);
                oModel.setProperty(this._editPath + "/address", address);
                oModel.setProperty(this._editPath + "/dateRange", dateRange);
                oModel.setProperty(this._editPath + "/cabinClass", cabinClass);
                oModel.setProperty(this._editPath + "/airport", airport);

                this._editPath = null;

                MessageToast.show("Updated");
            } else {

                var data = {
                    fullName: name,
                    phone: phone,
                    email: email,
                    address: address,
                    dateRange: dateRange,
                    cabinClass: cabinClass,
                    airport: airport
                };

                var aData = oModel.getProperty("/Bookings");
                aData.push(data);
                oModel.setProperty("/Bookings", aData);

                MessageToast.show("Created");
                this.onClearBooking();
            }

        },

        confirmDelete: function (oEvent) {
            this._oDeleteEvent = oEvent;

            var oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = this.loadFragment({
                    id: oView.getId(),
                    name: "ui5demokit.view.DeleteDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onDialogOkPress: function () {
            if (this._oDeleteEvent) {
                this.deleteItem(this._oDeleteEvent);
                this._oDeleteEvent = null;
            }

            this._pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        onDialogCancelPress: function () {
            this._pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        deleteItem: function (oEvent) {
            var oButton = oEvent.getSource();

            var oContext = oButton.getBindingContext();

            var sPath = oContext.getPath();

            var oModel = this.getView().getModel();
            var aData = oModel.getProperty("/Bookings");

            var iIndex = parseInt(sPath.split("/")[2]);

            if (!isNaN(iIndex)) {
                aData.splice(iIndex, 1);

                oModel.setProperty("/Bookings", aData);
                MessageToast.show("Deleted");
            } else {
                alert("Invalid index:", iIndex);
            }
        },

        editItem: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            var oData = oContext.getObject();
            this._editPath = oContext.getPath();

            this.getView().byId("inputFullName").setValue(oData.fullName);
            this.getView().byId("inputPhone").setValue(oData.phone);
            this.getView().byId("inputEmail").setValue(oData.email);
            this.getView().byId("inputAddress").setValue(oData.address);
            this.getView().byId("inputDateRange").setValue(oData.dateRange);
            this.getView().byId("selectCabinClass").setValue(oData.cabinClass);
            this.getView().byId("selectAirport").setValue(oData.airport);
        },

        handleLinkPress: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Flights");
        }

    });
});