BasecampApp.Views.TaskIndexItem = Backbone.View.extend({
  template: JST['tasks/index_item'],
  className: "task-index-item",

  events: {
    'click .complete-task': "completeTask",
    'click .delete-task': "deleteTask"
  },

  initialize: function (options) {
    this.project = options.project
    this.listenTo(this.model, 'sync', this.render);
  },

  completeTask: function (event) {
    if (this.model.get('status') === "completed") {
      this.model.save({ status: "incomplete"}, { patch: true});
    } else {
      this.model.save({ status: "completed" }, { patch: true });
    }
  },

  deleteTask: function () {
    this.model.destroy()
    this.remove();
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    if (this.model.get('status') === "completed") {
      this.$el.append($("<img>")
        .attr("src", "http://ajax.raffertyaluminum.com/pics/completed_stamp.gif")
        .addClass("complete-stamp pull-right"));
    }
    return this;
  }
});