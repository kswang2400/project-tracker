BasecampApp.Views.NavBar = Backbone.View.extend({
  template: JST['layouts/navbar'],
  className: "nav-side-bar",

  events: {
    "click .sign-out": "signOut"
  },

  initialize: function (options) {
    this.projects = options.projects;
    this.tagged = options.tagged;
  },

  render: function () {
    var content = this.template({ 
      projects: this.projects,
      tagged: this.tagged
    });
    this.$el.html(content);
    return this;
  },

  signOut: function (event) {
    event.preventDefault();

    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location.href = "/session/new"
      }
    });
  },
});