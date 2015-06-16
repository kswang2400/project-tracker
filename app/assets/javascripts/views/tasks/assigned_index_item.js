BasecampApp.Views.AssignedIndexItem = Backbone.View.extend({
  template: JST['tasks/assigned_index_item'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});