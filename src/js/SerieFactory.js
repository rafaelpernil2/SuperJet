/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore'],function(oj){
    var SerieFactory = {
        resourceUrl: 'http://back-api-dot-infra-triumph-229219.appspot.com/series/',
        
        createSerieModel: function() {
            var Serie = oj.Model.extend({
                urlRoot: this.resourceUrl,
                idAttribute: "id"
            });
            return new Serie();
        },
        createSerieCollection: function() {
            var Series = oj.Collection.extend({
                url: this.resourceUrl,
                model: this.createSerieModel()
            });
            return new Series();
        }
    };
    
    return SerieFactory;
});

