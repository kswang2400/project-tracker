BasecampApp.Collections.Memberships = Backbone.Collection.extend({
  model: BasecampApp.Models.Membership,
  url: "/api/memberships"
});