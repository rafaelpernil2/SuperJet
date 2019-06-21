/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'text!../config/config.json'],
    function (oj, jsonConfig) {
        var config = JSON.parse(jsonConfig);
        var SerieFactory = {

            createSerieModel: function () {
                var Serie = oj.Model.extend({
                    urlRoot: config.svc_serie,
                    idAttribute: "id"
                });
                return new Serie();
            },
            createSerieCollection: function () {
                var Series = oj.Collection.extend({
                    url: config.svc_serie,
                    model: this.createSerieModel()
                });
                return new Series();
            }
        };

        return SerieFactory;
    });

