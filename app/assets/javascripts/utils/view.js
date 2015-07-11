_.extend(Backbone.View.prototype, {
  // fuck you zombie view, wtf
  close: function () {
    this.unbind();
    this.stopListening();
    this.undelegateEvents();
    this.$el.empty().off();
    this.remove();
  }
})