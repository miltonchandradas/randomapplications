sap.ui.define(
  [
    "com/sap/uiapp1/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/Input",
    "sap/base/util/uid",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel, Input, uid) {
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

        let changeSetId = globalThis.crypto.randomUUID();;
        binding.create(initialValues, false, { changeSetId });

        // Need to enable cells for editing...
        this._enableCellsForEditing(true, false);
      },

      onUpdateLocal: function () {
        // Need to enable cells for editing...
        this._enableCellsForEditing(true, true);
      },

      onDeleteLocal: function (oEvent) {
        let src = oEvent.getSource();
        let item = src.getParent();

        let bindingContext = item.getBindingContext();
        let isTransient = bindingContext.isTransient();
        bindingContext.delete();

        // Need to visually indicate that the row is deleted...
        if (!isTransient) this._displayRowIsDeleted(true, item);
      },

      onReset: function () {
        this._mainModel.resetChanges(null, false, true).then(() => {
          // Need to disable cells for editing...
          this._enableCellsForEditing(false, false);
          this._displayRowIsDeleted(false, null);
        });
      },

      onSubmit: function () {
        this._mainModel.submitChanges();

        // Need to disable cells for editing...
        this._enableCellsForEditing(false, false);
        this._displayRowIsDeleted(false, null);
      },

      _displayRowIsDeleted: function (deleteFlag, item) {
        if (deleteFlag) {
          item.setHighlight("Error");
          item.setHighlightText("Row is deleted...");
          item.setTooltip("Row is deleted...");
          item.getCells().forEach((cell) => {
            cell.addStyleClass("cellBackground");
            cell.setEnabled(false);
            if (cell instanceof Input) cell.setEditable(false);
          });
        } else {
          let items = this._masterTable.getItems();

          items.forEach((item) => {
            item.setHighlight("None");
            item.setHighlightText("");
            item.setTooltip("");
            item.getCells().forEach((cell) => {
              cell.setEnabled(true);
              cell.removeStyleClass("cellBackground");
            });
          });
        }
      },

      _enableCellsForEditing: function (enableFlag, updateFlag) {
        let items = this._masterTable.getItems();

        if (updateFlag) {
          items.forEach((item) => {
            let cells = item.getCells();
            cells.forEach((cell) => {
              if (cell instanceof Input) {
                cell.setEditable(true);
              }
            });

            return;
          });
        }

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
