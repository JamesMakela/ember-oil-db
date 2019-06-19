import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  name: attr(),
  productType: attr(),
  location: attr(),
  viscosity: attr(),
  pourPoint: attr(),
  apis: attr(),
  categoriesStr: attr(),
  categories: attr(),
  status: attr()
});
