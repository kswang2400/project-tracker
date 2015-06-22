Basecamp.Collections.Comments = Backbone.Collection.extend({
  model: Basecamp.Models.Comment,
  url: "/api/comments"
});