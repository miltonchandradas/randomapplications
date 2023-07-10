sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("com.sap.uiapp2.controller.Master", {
      onInit: function () {
        console.log("onInit method is called...");
      },

      onBeforeRendering: function () {
        console.log("onBeforeRendering method is called...");
      },

      onAfterRendering: function () {
        console.log("onAfterRendering method is called...");
      },

      onExit: function () {
        console.log("onExit method is called...");
      },

      employeesFactory: function (id, context) {
        console.log("employeesFactory method is called...");
        console.log("id: ", id);

        let active = context.getProperty("active");
        let cell;
        if (active) {
          cell = new sap.m.Input({
            value: "{active}",
            editable: false,
          });
        } else {
          cell = new sap.m.Label({
            text: "{active}",
          });
        }

        return new sap.m.ColumnListItem({
          cells: [
            new sap.m.Input({
              value: "{firstName}",
              editable: false,
            }),
            new sap.m.Input({
              value: "{lastName}",
              editable: false,
            }),
            new sap.m.Input({
              value: "{email}",
              editable: false,
            }),
            new sap.m.Input({
              value: "{priority}",
              editable: false,
            }),
            cell,
          ],
        });
      },
    });
  }
);
