/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'text!../config/config.json'],
    function (oj, jsonConfig) {
        var config = JSON.parse(jsonConfig);
        var ComicHasSerieFactory = {
            
            createComicHasSerieModel: function () {
                var ComicHasSerie = oj.Model.extend({
                    urlRoot: config.svc_comic_has_serie,
                    idAttribute: "id"
                });
                return new ComicHasSerie();
            },
            createComicHasSerieCollection: function () {
                var ComicHasSeries = oj.Collection.extend({
                    url: config.svc_comic_has_serie,
                    model: this.createComicHasSerieModel()
                });
                return new ComicHasSeries();
            },
        };

        return ComicHasSerieFactory;
    });



