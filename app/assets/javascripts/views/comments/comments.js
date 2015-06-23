BasecampApp.Views.CommentsShow = Backbone.View.extend({
  template: JST['comments/comments_show'],

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  }
});