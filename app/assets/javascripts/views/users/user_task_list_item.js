BasecampApp.Views.UserTaskListItem = Backbone.View.extend({
  template: JST['tasks/user_task_list_item'],
  className: "task-list-item clearfix",

  events: {
    'click .complete-task': "completeTask",
    'click .delete-task': "deleteTask",
  },

  intialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  colorize: function (status) {
    taskStatus = this.$el.find('#task-status');

    if (status === "incomplete") {
      taskStatus.addClass("incomplete");
    } else {
      taskStatus.addClass("complete");
    }
  },

  completeTask: function (event) {
    if (this.model.get('status') !== "completed") {
      this.model.save({ status: "completed" }, { patch: true });
    }
    // move View to completed section?
  },

  deleteTask: function () {
    this.model.destroy();
    this.remove();
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.colorize(this.model.get("status"));
    return this;
  }
});