BasecampApp.Collections.Users = Backbone.Collection.extend({
  model: BasecampApp.Models.User,
  url: "/users"
});