BasecampApp.Views.CustomerSupport = Backbone.Modal.extend({
  template: JST["layouts/customer_support"],
  className: "modal-container",

  events: function () {
    return _.extend({}, Backbone.Modal.prototype.events, {
      "submit": "customerSupport",
    });
  }

  // KW: NOT DONE YET
})