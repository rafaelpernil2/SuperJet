/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore'],function(oj){
    var ComicFactory = {
        resourceUrl: 'http://back-api-dot-infra-triumph-229219.appspot.com/comics',
        getComicsBySerieStaticUrl: 'http://back-api-dot-infra-triumph-229219.appspot.com/comichasseries/comics',
        // Create a single comic instance
        createComicModel: function() {
            var Comic = oj.Model.extend({
                urlRoot: this.resourceUrl + '/',
                parse: this.parseComic,
                idAttribute: "id"
            });
            return new Comic();
        },
        createComicForDeleteModel: function() {
            var Comic = oj.Model.extend({
                urlRoot: this.resourceUrl,
                parse: this.parseComic,
                idAttribute: "id"
            });
            return new Comic();
        },
        createComicCollection: function() {
            var Comics = oj.Collection.extend({
                url: this.resourceUrl + '/',
                model: this.createComicModel()
            });
            return new Comics();
        },
        
        createComicForDeleteCollection: function() {
            var Comics = oj.Collection.extend({
                url: this.resourceUrl,
                model: this.createComicForDeleteModel()
            });
            return new Comics();
        },
        
        
        parseComic: function(response){
                            //var obj = {"comics": response};
                            var img = "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";
                            if (response){  
                                if (response.foto !==null){img = response.foto;}
                                return {
                                    id: response.id,
                                    nombre: response.nombre,
                                    anotacion_privada: response.anotacion_privada,
                                    isbn: response.isbn,
                                    foto: img
                                };
                            }
                        },
        
        
        
        getComicsBySerie: function(comic_id) {
            
            var Comics = oj.Collection.extend({
                url : this.getComicsBySerieStaticUrl + '/' + comic_id + '/',
                model: this.createComicForDeleteModel(),
                comparator: "id"
            });
            return new Comics();
            
            
        }
        
    };
    
    return ComicFactory;
    
});

