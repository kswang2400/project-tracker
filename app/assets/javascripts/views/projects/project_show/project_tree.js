BasecampApp.Views.ProjectTree = Backbone.CompositeView.extend({
  template: JST["projects/project_show/project_tree"],
  className: "project-tree",

  events: {
    "click .project-link": "doNothing",
    "click li.task-link-list-item": "changeTaskDetailsSubview"

  },

  doNothing: function (event) {
    event.preventDefault();
  },

  initialize: function (options) {
    this.projectShowView = options.projectShowView;

    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.tasks(), "add", this.addTaskLinkSubview);
    this.listenTo(this.model.tasks(), "remove", this.removeTaskLinkSubview);

  },

  addTaskLinkSubview: function (task) {
    var subview = new BasecampApp.Views.TaskLink({ model: task });

    if (task.get("status") === "completed") {
      this.addSubview(".nav-task-list.tasks-completed", subview);
    } else {
      if (task.get("priority") === 1) {
        this.addSubview(".tasks-incomplete.high-p", subview);
      } else {
        this.addSubview(".tasks-incomplete.low-p", subview);
      }
      // this.addSubview(".nav-task-list.tasks-incomplete", subview);
    }
  },

  changeTaskDetailsSubview: function (event) {
    event.preventDefault();

    var task_id = $(event.currentTarget).attr("id");
    var task = this.model.tasks().getOrFetch(task_id);
    this.emptySubviews("#task-details-sidebar");

    var subview = new BasecampApp.Views.TaskShow({ model: task });
    this.addSubview("#task-details-sidebar", subview);
  },

  removeTaskLinkSubview: function (task) {
    if (task.get("status") === "completed") {
      this.removeModelSubview(".nav-task-list.tasks-completed", task)
    } else {
      this.removeModelSubview(".nav-task-list.tasks-incomplete", task);
    }
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})