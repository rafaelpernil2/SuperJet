/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'text!../config/config.json'],
    function (oj, jsonConfig) {
        var config = JSON.parse(jsonConfig);
        var ComicFactory = {
            // Create a single comic instance
            createComicModel: function () {
                var Comic = oj.Model.extend({
                    urlRoot: config.svc_comic,
                    parse: this.parseComic,
                    idAttribute: "id"
                });
                return new Comic();
            },
            createComicCollection: function () {
                var Comics = oj.Collection.extend({
                    url: config.svc_comic,
                    model: this.createComicModel()
                });
                return new Comics();
            },


            parseComic: function (response) {
                
                var img = config.default_image_base_64;
                if (response) {
                    if (response.foto !== null) { img = response.foto; }
                    return {
                        id: response.id,
                        nombre: response.nombre,
                        anotacion_privada: response.anotacion_privada,
                        isbn: response.isbn,
                        foto: img
                    };
                }
            }.bind(this),



            getComicsBySerie: function (serie_id) {

                var Comics = oj.Collection.extend({
                    url: config.svc_comics_by_serie + '/' + serie_id,
                    model: this.createComicModel(),
                    comparator: "id"
                });
                return new Comics();


            }

        };

        return ComicFactory;

    });

