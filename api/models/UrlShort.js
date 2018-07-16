/**
 * UrlShort.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        sec: { type: 'number' }, 
        url: { type: 'string' },
        hash: { type: 'number', allowNull: true }
    },
    beforeCreate: function (valuesToSet, proceed) {
        var db = Counter.getDatastore().manager;
        var rawMongoCollection = db.collection(Counter.tableName);
        var sequenceDocument = rawMongoCollection.findOneAndUpdate(
            {code: 'UrlShortSequence' },
            {$inc:{sequence:1}}, 
            {
                returnOriginal: false
            }).then(function(sequenceUpdated){
                var sequenceNextVal = sequenceUpdated.value.sequence;
                valuesToSet.sec = sequenceNextVal;
                var hashStr = sequenceNextVal.toString() + valuesToSet.createdAt.toString();
                valuesToSet.hash = parseInt(hashStr);
                return proceed();
            }).catch(function(e){
                console.log(e);
                valuesToSet.sec = null;
                return proceed();
            });
        /*
        var sequenceDocument = rawMongoCollection.findAndModify(
            {
            query: {code: 'UrlShortSequence' },
            update: {$inc:{sequence:1}},
            new:true});*/
        /*
        Counter.update({ code: 'UrlShortSequence' }).set({$inc:{sequence:1}}).fetch()
            .then(function(counterSequence){
                console.log('A---------->');
                console.log(counterSequence[0]);
                var sequenceNextVal = counterSequence[0].sequence;
                console.log(sequenceNextVal);
                console.log(valuesToSet);
                valuesToSet.sec = sequenceNextVal;
                return proceed();

            }).catch(function(e){
                console.log(e);
            });
        */
    }
  /*afterCreate: function (newObj, next) {
        Model.update({ id: newObj.id }, { code: newObj.id }, next);
    }*/
};

