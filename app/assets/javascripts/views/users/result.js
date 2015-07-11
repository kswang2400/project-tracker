BasecampApp.Views.Result = Backbone.View.extend({
  template: JST['users/result'],
  className: "search-results",

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});