BasecampApp.Views.ProjectTree = Backbone.CompositeView.extend({
  template: JST["projects/project_show/project_tree"],
  className: "project-tree",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.incomplete_tasks(), "add", this.addTaskLinkSubview);
  },

  addTaskLinkSubview: function (task) {
    var subview = new BasecampApp.Views.TaskLink({ model: task });
    this.addSubview("ul.nav-task-list", subview);
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})