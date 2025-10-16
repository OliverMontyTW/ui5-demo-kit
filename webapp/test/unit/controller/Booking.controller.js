/*global QUnit*/

sap.ui.define([
	"ui5demokit/controller/Booking.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Booking Controller");

	QUnit.test("I should test the Booking controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
