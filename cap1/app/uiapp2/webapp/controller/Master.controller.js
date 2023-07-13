sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("com.sap.uiapp2.controller.Master", {
      onInit: async () => {
        console.log("onInit method: START");
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();
        console.log("onInit method: END");
      },

      onBeforeRendering: async () => {
        console.log("onBeforeRendering method: START");
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();
        console.log("onBeforeRendering method: END");
      },

      onAfterRendering: async () => {
        console.log("onAfterRendering method: START");
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();
        console.log("onAfterRendering method: END");
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
