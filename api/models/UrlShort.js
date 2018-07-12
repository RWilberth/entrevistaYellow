/**
 * UrlShort.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'number', columnName: '_id', autoIncrement: true }, 
    url: { type: 'string' },
    hash: { type: 'string', allowNull: true }
  },
  dontUseObjectIds: true
  /*afterCreate: function (newObj, next) {
        Model.update({ id: newObj.id }, { code: newObj.id }, next);
    }*/
};

