BasecampApp.Views.UserTaskListItem = Backbone.View.extend({
  template: JST['tasks/user_task_list_item'],
  className: "task-list-item clearfix",

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

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.colorize(this.model.get("status"));
    return this;
  }
});