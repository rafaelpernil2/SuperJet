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
define(['ojs/ojcore'],function(oj){
    var ComicHasSerieFactory = {
        resourceUrl: 'http://back-api-dot-infra-triumph-229219.appspot.com/comichasseries',
        
        createComicHasSerieModel: function() {
            var ComicHasSerie = oj.Model.extend({
                urlRoot: this.resourceUrl+ '/',
                idAttribute: "id"
            });
            return new ComicHasSerie();
        },
        createComicHasSerieForDeleteModel: function() {
            var ComicHasSerie = oj.Model.extend({
                urlRoot: this.resourceUrl,
                idAttribute: "id"
            });
            return new ComicHasSerie();
        },
        createComicHasSerieCollection: function() {
            var ComicHasSeries = oj.Collection.extend({
                url: this.resourceUrl + '/',
                model: this.createComicHasSerieModel()
            });
            return new ComicHasSeries();
        },
        createComicHasSerieForDeleteCollection: function() {
            var ComicHasSeries = oj.Collection.extend({
                url: this.resourceUrl + '/',
                model: this.createComicHasSerieForDeleteModel()
            });
            return new ComicHasSeries();
        }
    };
    
    return ComicHasSerieFactory;
});



