/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojhtmlutils', 'ComicFactory', 'SerieFactory', 'ComicHasSerieFactory', 'ojs/ojselectcombobox', 'ojs/ojchart', 'demo-card/loader',
    'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojdialog', 'ojs/ojcollectiondataprovider',
    'ojs/ojarraydataprovider', 'ojs/ojmodule-element', 'ojs/ojcollectiontabledatasource'],
        function (oj, ko, $, HtmlUtils, ComicFactory, SerieFactory, ComicHasSerieFactory) {

            function DashboardViewModel() {
                var self = this;
                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.
                /*
                 var url = "js/store_data.json"; // Defines link to local data file
                 self.activityDataProvider = ko.observable(); // gets data for Activities list
                 
                 $.getJSON(url).then(data => {
                 var activitiesArray = data;
                 self.activityDataProvider(new oj.ArrayDataProvider(activitiesArray, {keyAttributes: "id"}));
                 });
                 */


                var RESTurl = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";
                //Single line of data
                var activityModel = oj.Model.extend({
                    urlRoot: RESTurl,
                    idAttribute: 'id'
                });
                var activityCollection = new oj.Collection(null,
                        {
                            url: RESTurl,
                            model: activityModel,
                            comparator: 'id'
                        });
                self.activityDataProvider = ko.observable();
                self.activityDataProvider(new oj.CollectionTableDataSource(activityCollection));
                self.comicData = ko.observableArray([]);
                self.serieSeleccionada = null;

                // Activity selection observables
                self.activitySelected = ko.observable(false);
                self.selectedActivity = ko.observable();
                self.firstSelectedActivity = ko.observable();
                self.selectedComic = ko.observable();
                self.firstSelectedComic = ko.observable();

                self.comicHasSerieCollection = ComicHasSerieFactory.createComicHasSerieForDeleteCollection();
                self.comicHasSerieCollectionForDelete = ComicHasSerieFactory.createComicHasSerieForDeleteCollection();
                self.comicHasSerieCollection.fetch();
                self.comicHasSerieCollectionForDelete.fetch();
                // Comic REST CALL

                self.comicCollection = ComicFactory.createComicCollection(),
                        self.comicCollectionForDelete = ComicFactory.createComicCollectionForDelete(),
                        self.dataSource = ko.observable(),
                        self.dataSource(new oj.CollectionTableDataSource(self.comicCollection)),
                        self.comicCollection.fetch(),
                        self.comicCollectionForDelete.fetch(),
                        // Serie REST CALL

                        self.serieCollection = SerieFactory.createSerieCollection(),
                        self.serieDataSource = ko.observable(),
                        self.serieDataSource(new oj.CollectionTableDataSource(self.serieCollection)),
                        self.testList = ko.observable(),
                        self.serieCollection.fetch(),
                        self.testList(new oj.CollectionDataProvider(self.serieCollection)),
                        self.updateComic = function (event, data) {
                            document.getElementById('editDialog').open();
                        },
                        self.updateComicSubmit = function (event) {
                            document.getElementById('editDialog').close();

                        }

                self.deleteComic = function (event, data) {


                    self.comicModel = self.comicCollectionForDelete.get(data.data.id);
                    //console.log(self.comicModel.attributes)
                    self.comicBySerieCollection.remove(self.comicModel.attributes, null)
                    self.comicModel.destroy({"data": {"id": data.data.id}, "headers": {"Content-Type": 'application/json'}});

                    self.comicHasSerieModel = self.comicHasSerieCollection.findWhere({id_comic: data.data.id});
                    self.comicHasSerieCollection.remove(self.comicHasSerieModel.attributes, null);
                    self.comicHasSerieModel.destroy({"headers": {"Content-Type": 'application/json'}});
                    self.comicBySerieCollection = ComicFactory.getComicsBySerie(data.data.id),
                            self.comicBySerieCollection.fetch();
                            // Populate items list using DataSource fetch
                            

                },
                        self.selectedComicChanged = function (event) {
                            // Check whether click is an Activity selection or a deselection
                            if (event.detail.value.length != 0) {
                                // If selection, populate and display list


                                /*
                                 var activityKey = self.firstSelectedActivity().data.id;
                                 var url = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/" + activityKey + '/items/';
                                 */
                            } else {
                                // If deselection, hide list   


                            }
                        },
                        self.refreshItemList = function (event) {
                            
                            console.log("Refresh");
                        }
                /* Handle selection of Activities List */
                self.selectedActivityChanged = function (event) {
                    // Check whether click is an Activity selection or a deselection
                    if (event.detail.value.length != 0) {
                        // If selection, populate and display list
                        var serieSeleccionada = self.firstSelectedActivity().data.id;
                        self.serieSeleccionada = self.firstSelectedActivity().data.id;


                        self.comicBySerieCollection = ComicFactory.getComicsBySerie(serieSeleccionada),
                                self.comicBySerieCollection.fetch(),
                                // Populate items list using DataSource fetch
                                self.dataSource(new oj.CollectionTableDataSource(self.comicBySerieCollection));
                        // Set List View Properties
                        self.activitySelected(true);
                        /*
                         var activityKey = self.firstSelectedActivity().data.id;
                         var url = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/" + activityKey + '/items/';
                         */
                    } else {
                        // If deselection, hide list   
                        self.activitySelected(false);
                        self.itemSelected(false);
                    }
                },
                        self.showCreateDialog = function (event) {
                            document.getElementById('createDialog').open();
                        },
                        self.router = oj.Router.rootInstance;
                self.goToCreateComic = function (event) {
                    self.router.go('create-comic/' + self.firstSelectedActivity().data.id);
                    return true;
                },
                        this.val = ko.observable("pie");
                self.name = 'Deb Raphaely',
                        self.avatar = 'images/composites/debraphaely.png',
                        self.title = 'Purchasing Director',
                        self.work = 5171278899,
                        self.email = 'deb.raphaely@oracle.com',
                        /* toggle button variables */
                        self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');

                /* chart data */
                var barSeries = [{name: "Series 1", items: [42, 34]},
                    {name: "Series 2", items: [55, 30]},
                    {name: "Series 3", items: [36, 50]},
                    {name: "Series 4", items: [22, 46]},
                    {name: "Series 5", items: [22, 46]}];

                var barGroups = ["Group A", "Group B"];

                self.barSeriesValue = ko.observableArray(barSeries);
                self.barGroupsValue = ko.observableArray(barGroups);





                /** 
                 * Define the oj-module inline template for Activity Items list
                 */
                var lg_xl_view = '<h1><oj-label for="itemsList">Activity Items</oj-label></h1>' +
                        '<oj-list-view style="font-size: 18px">' +
                        '<ul>' +
                        '<li>' +
                        '<div class="oj-flex-item">' +
                        '<p>SureCatch Baseball Glove</p>' +
                        '<p>Western R16 Helmet</p>' +
                        '<p>Western C1 Helmet</p>' +
                        '<p>Western Bat</p>' +
                        '</div>' +
                        '</li>' +
                        '<li>' +
                        '<div class="oj-flex-item">' +
                        '<p>Air-Lift Tire Pump</p>' +
                        '<p>Intact Bike Helmet</p>' +
                        '<p>Nimbus Bike Tire</p>' +
                        '<p>Refill Water Bottle</p>' +
                        '<p>Swift Boys 21 Speed</p>' +
                        '</div>' +
                        '</li>' +
                        '</ul>' +
                        '</oj-list-view>'
                //Display this content for small and medium screen sizes
                var sm_md_view = '<div id="sm_md" style="background-color:lightcyan; padding: 10px; font-size: 10px">' +
                        '<h1><oj-label for="itemsList">Activity Details</oj-label></h1>' +
                        '<oj-list-view style="font-size: 18px">' +
                        '<ul>' +
                        '<li>' +
                        '<div class="oj-flex-item">' +
                        '<p>SureCatch Baseball Glove</p>' +
                        '<p>Western R16 Helmet</p>' +
                        '<p>Western C1 Helmet</p>' +
                        '<p>Western Bat</p>' +
                        '</div>' +
                        '</li>' +
                        '</ul>' +
                        '</oj-list-view>'
                '</div>';
                // Identify the screen size and display the content for that screen size
                var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);

                self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
                self.moduleConfig = ko.pureComputed(function () {
                    var viewNodes = HtmlUtils.stringToNodeArray(self.large() ? lg_xl_view : sm_md_view);
                    return {view: viewNodes};
                });
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
                    // Implement if needed
                    //console.log("Transita");
                    if (self.serieSeleccionada !== null) {
                        //console.log("Llega" + self.serieSeleccionada);

                        self.comicBySerieCollection = ComicFactory.getComicsBySerie(self.serieSeleccionada);
                        self.comicBySerieCollection.fetch();
                        self.comicCollectionForDelete.fetch();
                        self.comicHasSerieCollection.fetch();
                        self.comicHasSerieCollectionForDelete.fetch();
                        self.dataSource(new oj.CollectionTableDataSource(self.comicBySerieCollection));
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
