BasecampApp.Views.UsersSearch = Backbone.View.extend({
  template: JST['users/search'],
  className: "users-search",

  events: {
    'click .close': "removeSearch"
  },

  removeSearch: function (event) {
    this.remove();
  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    return this;
  }
});