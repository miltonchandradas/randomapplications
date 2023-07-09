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

        const getInitialPriority = () => {
          let items = this._masterTable.getItems();
          let filteredItems = items.filter(
            (item) => item.getHighlight() !== "Error"
          );

          return filteredItems.length + 1;
        };
        let initialValues = {
          firstName: "",
          lastName: "",
          email: "",
          priority: getInitialPriority(),
        };

        binding.create(initialValues, true);

        // Need to enable cells for editing...
        this._enableCellsForEditing(false);
      },

      onUpdateLocal: function () {
        // Need to enable cells for editing...
        this._enableCellsForEditing(true);
      },

      onDeleteLocal: function (oEvent) {
        let src = oEvent.getSource();
        let item = src.getParent();

        let bindingContext = item.getBindingContext();
        let isTransient = bindingContext.isTransient();

        const updatePriority = (item) => {
          let rows = this._masterTable.getItems();
          let priority = 1;
          rows.forEach((row) => {
            if (row !== item && row.getHighlight() !== "Error") {
              row.getCells()[3].setText(priority);
              priority++;
            }
          });
        };

        updatePriority(item);
        bindingContext.delete();

        // Need to visually indicate that the row is deleted...
        if (!isTransient) this._displayRowIsDeleted(item);
      },

      onReset: function () {
        let bindingInfo = this._masterTable.getBindingInfo("items");
        this._masterTable.destroyItems();
        this._mainModel.resetChanges(null, false, true).then(() => {
          // Need to disable cells for editing...
          this._masterTable.bindItems(bindingInfo);
        });
      },

      onSubmit: function () {
        let bindingInfo = this._masterTable.getBindingInfo("items");
        this._masterTable.destroyItems();
        this._mainModel.submitChanges({
          success: () => {
            // Need to disable cells for editing...
            this._masterTable.bindItems(bindingInfo);
          },
        });
      },

      _displayRowIsDeleted: function (item) {
        item.setHighlight("Error");
        item.setHighlightText("Row is deleted...");
        item.setTooltip("Row is deleted...");
        item.getCells().forEach((cell) => {
          cell.addStyleClass("cellBackground");
          if (cell instanceof Input) cell.setEnabled(false);
          if (cell instanceof Input) cell.setEditable(false);
        });
      },

      _enableCellsForEditing: function (updateFlag) {
        let items = this._masterTable.getItems();

        if (updateFlag) {
          items.forEach((item) => {
            let cells = item.getCells();
            cells.forEach((cell) => {
              if (cell instanceof Input) {
                cell.setEditable(true);
              }
            });
          });

          return;
        }

        items.forEach((item) => {
          if (item.getBindingContext().isTransient()) {
            let cells = item.getCells();
            cells.forEach((cell) => {
              if (cell instanceof Input) {
                cell.setEditable(true);
              }
            });
          }
        });
      },
    });
  }
);
