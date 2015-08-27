Backbone.Modal = Backbone.View.extend({
  events: {
    "keydown": "esc",
    "click .modal-backdrop": "removeModal"
  },
  
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