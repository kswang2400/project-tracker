BasecampApp.Views.UsersSearch = Backbone.View.extend({
  template: JST['users/search'],
  className: "users-search",

  initialize: function () {

  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    return this;
  }
});