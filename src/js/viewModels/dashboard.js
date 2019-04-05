/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojhtmlutils', 'ComicFactory', 'SerieFactory', 'ComicHasSerieFactory', 'ojs/ojselectcombobox', 'ojs/ojchart', 'demo-update-item/loader',
    'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojdialog', 'ojs/ojcollectiondataprovider','ojs/ojinputtext',
    'ojs/ojarraydataprovider', 'ojs/ojmodule-element', 'ojs/ojcollectiontabledatasource'],
    function (oj, ko, $, HtmlUtils, ComicFactory, SerieFactory, ComicHasSerieFactory) {

        function DashboardViewModel() {
            var self = this;

            self.router = oj.Router.rootInstance;

            // Data Sources

            self.comicDataSource = ko.observable();
            self.serieDataSource = ko.observable(),

            // Selections

            self.selectedSerie = ko.observable();
            self.selectedComic = ko.observable();

            // Select-One element

            self.firstSelectedSerie = ko.observable();
            self.firstSelectedComic = ko.observable();

            // Selection boolean

            self.serieIsSelected = ko.observable(false);
            self.comicIsSelected = ko.observable(false);


            // Collections

            self.comicHasSerieCollection = ComicHasSerieFactory.createComicHasSerieCollection();
            self.serieCollection = SerieFactory.createSerieCollection();
            self.comicCollection = ComicFactory.createComicCollection();


            // Collections initializations

            self.serieCollection.fetch();
            self.comicHasSerieCollection.fetch();


            // Data Sources initialization

            self.serieDataSource(new oj.CollectionTableDataSource(self.serieCollection));


            // Other observables

            self.comicData = ko.observableArray([]);



            self.deleteComic = function (event, data) {
                var comicModel = self.comicBySerieCollection.get(data.data.id);
                self.comicCollection.remove(comicModel.attributes, null);
                comicModel.destroy();
            },




            // Event listeners



            self.selectedComicChanged = function (event) {
            },

            self.selectedSerieChanged = function (event) {
                if (event.detail.value.length != 0) {
                    //console.log({"SerieConsoleLog": self.firstSelectedSerie().data.id});
                    self.serieSeleccionada = self.firstSelectedSerie().data.id;

                    self.comicBySerieCollection = ComicFactory.getComicsBySerie(self.serieSeleccionada);
                    self.comicBySerieCollection.fetch();

                    self.comicDataSource(new oj.CollectionTableDataSource(self.comicBySerieCollection));
                    self.serieIsSelected(true);
                } else {
                    self.serieIsSelected(false);
                    self.comicIsSelected(false);
                }
            },


            self.updateComic = function (event,data) {
                var comicModel = self.comicBySerieCollection.get(data.data.id);
                self.comicData( {
                        'id': comicModel.attributes.id,
                        'nombre': comicModel.attributes.nombre,
                        'isbn': comicModel.attributes.isbn,
                        'anotacion_privada': comicModel.attributes.anotacion_privada
                    });
                editDialog.open();
            },
            self.updateComicSubmit = function (event,data) {
                var comicModel = self.comicBySerieCollection.get(self.comicData().id);
                comicModel.save(self.comicData());
                editDialog.close();
            }

            self.showCreateDialog = function (event) {
                createDialog.open();
             },

            self.goToCreateComic = function (event) {
                self.router.go('create-comic/' + self.firstSelectedSerie().data.id);
                return true;
            },

            /**
             * End of oj-module code
             */
            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * This method might be called multiple times - after the View is created
             * and inserted into the DOM and after the View is reconnected
             * after being disconnected.
             */
            self.connected = function () {

                if (self.serieIsSelected()) {
                    self.comicHasSerieCollection.fetch();
                    self.comicBySerieCollection.fetch();
                }
            };

            /**
             * Optional ViewModel method invoked after the View is disconnected from the DOM.
             */
            self.disconnected = function () {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            self.transitionCompleted = function () {
                // Implement if needed

            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new DashboardViewModel();
    }
);
