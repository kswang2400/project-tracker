BasecampApp.Views.UploadShow = Backbone.Modal.extend({
  template: JST['uploads/show'],

  events: function () {
    return _.extend({}, Backbone.Modal.prototype.events, {
      "click .modal-backdrop": "removeModal",
      "click #deleteUpload": "deleteUpload"
    });
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  deleteUpload: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    return this;
  }
});