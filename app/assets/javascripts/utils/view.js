_.extend(Backbone.View.prototype, {
  close: function () {
    // fuck you zombie view, wtf
    this.unbind();
    this.stopListening();
    this.undelegateEvents();
    this.$el.empty().off();
    this.remove();
  }
})