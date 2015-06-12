BasecampApp.Views.UploadShow = Backbone.View.extend({
  template: JST['uploads/show'],

  events: {
    // 'keydown': 'esc',
    "click .modal-backdrop": "removeModal"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  esc: function (event) {
    debugger;
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