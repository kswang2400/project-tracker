BasecampApp.Views.TaskLink = Backbone.View.extend({
  template: JST["projects/project_show/task_link"],
  tagName: "li",
  className: "task-link-list-item",

  events: {
    "click": "addTaskDetailsSubview"
  },

  addTaskDetailsSubview: function (event) {
    event.preventDefault();
    this.projectShowView.emptySubviews("#task-details-sidebar");

    var subview = new BasecampApp.Views.TaskShow({ model: this.model });
    this.projectShowView.addSubview("#task-details-sidebar", subview);
  },

  initialize: function (options) {
    this.projectShowView = options.projectShowView;
    this.project = options.project;

    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
});