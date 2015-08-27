BasecampApp.Views.CustomerSupport = Backbone.CompositeView.extend({
  template: JST["layouts/customer_support"],
  className: "modal-container",

  events: {
    "submit": "customerSupport",
    
  },
})