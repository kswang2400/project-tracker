BasecampApp.Views.CustomerSupport = Backbone.CompositeView.extend({
  template: JST["layouts/customer_support"],
  className: "modal-container",

  events: function () {
    return _.extend({}, Backbone.Modal.prototype.events, {
      "submit": "customerSupport",
    });
  },

  // KW: NOT DONE YET
})