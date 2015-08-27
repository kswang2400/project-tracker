Backbone.Modal = Backbone.View.extend({
  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  removeModal: function (event) {
    event.preventDefault();
    this.remove();
  }
})