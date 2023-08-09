sap.ui.define(
  ["com/sap/uiapp1/controller/BaseController", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("com.sap.uiapp1.controller.Detail", {
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

        this.getRouter()
          .getRoute("detail")
          .attachMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
        let oArgs, oQuery;
        oArgs = oEvent.getParameter("arguments");

        oQuery = oArgs["?query"];
        if (oQuery) {
          let { sPathEncoded } = oQuery;
          this._viewModel.setProperty(
            "/sPath",
            decodeURIComponent(sPathEncoded)
          );

          this.getView().bindElement({
            path: this._viewModel.getProperty("/sPath"),
            events: {
              change: (oEvent) => this._onBindingChange(oEvent),
              dataRequested: () => {},
              dataReceived: (oEvent) => {
                this.getView().setBusy(false);
              },
            },
          });
        }
      },

      _onBindingChange: async function (oEvent) {
        // No data for the binding...
        // TODO: Add notFound route to NotFound view
        if (!this.getView().getBindingContext()) {
          this.getRouter().getTargets().display("notFound");
        }
      },
    });
  }
);
