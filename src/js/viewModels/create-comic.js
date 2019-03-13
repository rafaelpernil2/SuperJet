/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore',
    'knockout',
    'jquery',
    'ComicFactory',
    'ComicHasSerieFactory',
    'ojs/ojlabel',
    'ojs/ojchart',
    'ojs/ojlistview',
    'ojs/ojarraydataprovider',
    'ojs/ojavatar',
    'ojs/ojmodel',
    'ojs/ojcollectiontabledatasource',
    'ojs/ojdialog',
    'ojs/ojinputtext'
],
        function (oj, ko, $, ComicFactory, ComicHasSerieFactory) {
            function CreateComicViewModel() {
                var self = this;

                self.router = oj.Router.rootInstance;
                self.serie_id = self.router.currentState().parameters.serie_id;

                self.newItem = ko.observableArray([]);

                self.comicCollection = ComicFactory.createComicCollection();
                self.comicHasSeriesCollection = ComicHasSerieFactory.createComicHasSerieCollection();

                self.createComic = function (event, data) {
                    //self.router.go('dashboard');
                    
                    var comic = {
                        nombre: data.newItem.nombre,
                        isbn: data.newItem.isbn,
                        anotacion_privada: data.newItem.anotacion_privada
                    };
                    self.comicCollection.create(comic, {
                        wait: true,
                        contentType: 'application/json',
                        success: function (model, response) {
                            console.log('Successfully created a new comic');
                            
                            self.comicCollection.fetch();
                            
                            var comic_has_serie = {
                                id_comic: self.comicCollection.findWhere({nombre: data.newItem.nombre}).attributes.id,
                                id_serie: self.serie_id
                            };

                            self.comicHasSeriesCollection.fetch();
                            
                            self.comicHasSeriesCollection.create(comic_has_serie, {
                                wait: true,
                                contentType: 'application/json',
                                success: function (model, response) {
                                    console.log('Successfully created the related comic_has_serie');
                                    self.router.go('dashboard');
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log('Error in Create: ' + jqXHR.statusCode.caller);
                                }
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Error in Create: ' + jqXHR.statusCode.caller);
                        }
                    });
                    

                };


                self.connected = function () {
                    // Implement if needed
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
            return new CreateComicViewModel();
        }
);

