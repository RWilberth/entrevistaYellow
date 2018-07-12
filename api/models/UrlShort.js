/**
 * UrlShort.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    url: { type: 'string' },
    hash: { type: 'string' }
  },
  /*afterCreate: function (newObj, next) {
        Model.update({ id: newObj.id }, { code: newObj.id }, next);
    }*/
};

