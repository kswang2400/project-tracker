BasecampApp.Collections.Comments = Backbone.Collection.extend({
  model: BasecampApp.Models.Comment,
  url: "/api/comments"
});