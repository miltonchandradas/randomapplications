sap.ui.define(
  [
    "com/sap/uiapp1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/Input",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel, Input) {
    "use strict";

    return BaseController.extend("com.sap.uiapp1.controller.Master", {
      onInit: function () {
        // Setting the view model for busy indicators
        let viewModel = new JSONModel({
          busy: false,
          delay: 0,
          currency: "USD",
        });

        this.getView().setModel(viewModel, "viewModel");
        this._viewModel = this.getView().getModel("viewModel");

        this._mainModel = this.getOwnerComponent().getModel();
        this._masterTable = this.byId("masterTable");
      },

      onCreateLocal: function () {
        let binding = this._masterTable.getBinding("items");
        let initialValues = {
          firstName: "",
          lastName: "",
          email: "",
        };
        binding.create(initialValues);

        // Need to enable cells for editing...
        this._enableCellsForEditing(true);
      },

      onSubmit: function () {
        this._mainModel.submitChanges();

        // Need to disable cells for editing...
        this._enableCellsForEditing(false);
      },

      _enableCellsForEditing: function (enableFlag) {
        let items = this._masterTable.getItems();
        items.forEach((item) => {
          if (enableFlag && item.getBindingContext().isTransient()) {
            let cells = item.getCells();
            cells.forEach((cell) => {
              if (cell instanceof Input) {
                cell.setEditable(true);
              }
            });
          } else if (!enableFlag) {
            let cells = item.getCells();
            cells.forEach((cell) => {
              if (cell instanceof Input) {
                cell.setEditable(false);
              }
            });
          }
        });
      },
    });
  }
);
