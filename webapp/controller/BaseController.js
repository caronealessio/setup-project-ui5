// @ts-check

sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment", "appnamespace/model/formatter"],
  function (Controller, Fragment, formatter) {
    "use strict";

    return Controller.extend("appnamespace.controller.BaseController", {
      formatter: formatter,

      /**
       * Ottiene il modello associato alla vista. Facoltativamente, specifica il nome del modello.
       *
       * @param {string} [sName] Il nome del modello. Se non fornito, viene restituito il modello predefinito.
       * @returns {sap.ui.model.Model} L'istanza del modello associata alla vista.
       */
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      /**
       * Imposta un modello sulla vista. Facoltativamente, specifica un nome per il modello.
       *
       * @param {sap.ui.model.Model} oModel Il modello da impostare sulla vista.
       * @param {string} [sName] Il nome del modello. Se non fornito, il modello viene impostato come modello predefinito.
       * @returns {void}
       */
      setModel: function (oModel, sName) {
        this.getView().setModel(oModel, sName);
        return this.getModel(sName);
      },

      /**
       * Ottiene un modello globale dal core. Facoltativamente, specifica il nome del modello.
       *
       * @param {string} [sName] Il nome del modello. Se non fornito, viene restituito il modello globale predefinito.
       * @returns {sap.ui.model.Model} L'istanza del modello globale dal core.
       */
      getGlobalModel: function (sName) {
        return sap.ui.getCore().getModel(sName);
      },

      /**
       * Imposta un modello globale sul core. Facoltativamente, specifica un nome per il modello.
       *
       * @param {sap.ui.model.Model} oModel Il modello da impostare globalmente sul core.
       * @param {string} [sName] Il nome del modello. Se non fornito, il modello viene impostato come modello globale predefinito.
       * @returns {sap.ui.model.Model} L'istanza del modello globale impostato sul core.
       */
      setGlobalModel: function (oModel, sName) {
        sap.ui.getCore().setModel(oModel, sName);
        return sap.ui.getCore().getModel(sName);
      },

      /**
       * Ottiene l'istanza del router per il componente corrente.
       *
       * @returns {sap.ui.core.routing.Router} L'istanza del router associata a questo componente.
       */
      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },

      /**
       * Naviga verso una route diversa utilizzando il router.
       *
       * @param {string} sName Il nome della route verso cui navigare.
       * @param {Object} [oParameters] Parametri opzionali da passare alla route.
       * @param {boolean} [bReplace] Se true, sostituisce l'entrata corrente nella cronologia con quella nuova (opzionale).
       * @returns {void}
       */
      navTo: function (sName, oParameters, bReplace) {
        this.getRouter().navTo(sName, oParameters, undefined, bReplace);
      },

      /**
       * Imposta lo stato di "busy" (occupato) della vista.
       * Quando il parametro `bBusy` è impostato su `true`, la vista viene considerata occupata
       * e viene visualizzato un indicatore di caricamento (di solito un "busy indicator").
       * Quando `bBusy` è impostato su `false`, l'indicatore di caricamento viene rimosso
       * e la vista torna al suo stato normale.
       *
       * @param {boolean} bBusy - Stato di "busy". `true` per mostrare l'indicatore di caricamento, `false` per nasconderlo.
       */
      setBusy: function (bBusy) {
        this.getView().setBusy(bBusy);
      },

      /**
       * Restituisce una stringa localizzata dal modello di risorse i18n del componente.
       * Utilizza il modello "i18n" definito nel componente per accedere al bundle delle traduzioni,
       * permettendo di ottenere facilmente testi localizzati in base alla chiave fornita.
       *
       * @param {string} sKey - La chiave della stringa localizzata da recuperare (definita nei file i18n.properties).
       * @returns {string} La stringa tradotta corrispondente alla chiave specificata.
       */
      getText: function (sKey) {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey);
      },

      /**
       * Carica un frammento di vista (fragment) in modo asincrono e lo aggiunge come dipendente della vista corrente.
       * Se il frammento è già stato caricato, restituisce l'istanza già esistente per evitare il caricamento ripetuto.
       *
       * @param {string} sFragmentName Il nome del frammento da caricare (deve essere un percorso relativo o completo).
       * @param {string} [sFragmentId] Un identificativo opzionale per il frammento. Se non fornito, verrà usato l'ID della vista.
       * @returns {Promise<sap.ui.core.Fragment>} Una promessa che restituisce l'oggetto frammento caricato.
       */
      loadFragment: function (sFragmentName, sFragmentId) {
        var oView = this.getView();
        var sId = sFragmentId || oView.getId() + "--" + sFragmentName;

        // Controlla se il frammento è già caricato e lo restituisce direttamente
        var oFragment = oView.byId(sId);
        if (oFragment) {
          return Promise.resolve(oFragment);
        }

        // Carica il frammento in modo asincrono
        return sap.ui.core.Fragment.load({
          id: oView.getId(),
          name: sFragmentName,
          controller: this,
        }).then(
          function (oFragment) {
            // Aggiunge il frammento come dipendente della vista
            oView.addDependent(oFragment);

            // Se necessario, aggiungi altre logiche di configurazione o binding qui (ad esempio, il modello "i18n")
            oFragment.setModel(this.getModel("i18n"), "i18n");

            // Restituisce il frammento caricato
            return oFragment;
          }.bind(this)
        );
      },
    });
  }
);
