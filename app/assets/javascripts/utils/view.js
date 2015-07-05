_.extend(Backbone.View.prototype, {
  close: function () {
    this.remove();
    this.unbind();

    if (this.onClose) {
      this.onClose();
    }
  },

  onClose: function () {
    this.model.unbind("change", this.render);
  }
})