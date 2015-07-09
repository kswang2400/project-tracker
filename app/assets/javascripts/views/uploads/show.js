BasecampApp.Views.UploadShow = Backbone.View.extend({
  template: JST['uploads/show'],

  events: {
    "click .modal-backdrop": "removeModal",
    "click #deleteUpload": "deleteUpload",
    'keydown': 'esc',
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  deleteUpload: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  removeModal: function () {
    this.remove();
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    return this;
  }
});