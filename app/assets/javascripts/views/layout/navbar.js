BasecampApp.Views.NavBar = Backbone.View.extend({
  template: JST["layouts/navbar"],
  className: "nav-side-bar",

  events: {
    "click .sign-out": "signOut",
    "click .customer-support": "customerSupport",
    "submit": "sendCustomerSupport"
  },

  initialize: function (options) {
    this.projects = options.projects;
    this.tagged = options.tagged;
  },

  customerSupport: function () {
    this.$el.find(".nav-task-list").addClass("hidden");
    this.$el.find("#customer-question").toggleClass("hidden");
  },

  render: function () {
    var content = this.template({ 
      projects: this.projects,
      tagged: this.tagged
    });
    this.$el.html(content);
    return this;
  },

  sendCustomerSupport: function (event) {
    event.preventDefault();

    var question = this.$el.find("textarea").serializeJSON();
    var response = this.$el.find("#response");

    $.ajax({
      url: "/customer_support",
      type: "POST",
      data: question,
      success: function () {
        response.removeClass("hidden");
        setTimeout(function () {
          response.addClass("hidden");
          this.$el.find("#customer-question").addClass("hidden");
        }.bind(this), 2000);
      }.bind(this)
    })
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
  }
});