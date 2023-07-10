sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("com.sap.uiapp2.controller.Master", {
      onInit: function () {},

      employeesFactory: function (id, context) {
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
