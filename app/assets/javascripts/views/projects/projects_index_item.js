BasecampApp.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['projects/index_item'],
  tagName: "li",
  className: "projects-index-item",

  events: {
    'click .delete-project': "destroyProject",
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  destroyProject: function (event) {
    event.preventDefault();
    var yes = confirm("Are you sure you want to delete this project?")
    if (yes) {
      this.model.destroy();
      this.remove(); 
    }
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});