BasecampApp.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ projects: this.collection });
    this.$el.html(content);
    return this;
  }
});