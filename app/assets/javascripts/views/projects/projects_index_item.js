BasecampApp.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['projects/index_item'],
  tagName: "ul",
  className: "projects-index-item",

  events: {
    'click': "show"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  },

  show: function () {
    Backbone.history.navigate("/projects/" + this.model.escape('id'), { trigger: true });
  }
});