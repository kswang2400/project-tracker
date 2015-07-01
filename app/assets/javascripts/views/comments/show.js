BasecampApp.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],
  className: "comment",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  }
});