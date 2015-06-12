BasecampApp.Views.UploadsIndexItem = Backbone.View.extend({
  template: JST['uploads/index_item'],
  className: "item",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ upload: this.model });
    this.$el.html(content);
    return this;
  },

  showImage: function () {
    alert('showImage');
  }
})