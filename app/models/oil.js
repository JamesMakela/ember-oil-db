import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr(),
  productType: DS.attr(),
  location: DS.attr(),
  status: DS.attr(),
  viscosity: DS.attr(),
  pourPoint: DS.attr(),
  apis: DS.attr(),
  categoriesStr: DS.attr(),
  categories: DS.attr()
});
