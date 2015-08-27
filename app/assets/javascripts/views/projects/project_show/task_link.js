BasecampApp.Views.TaskLink = Backbone.View.extend({
  template: JST["projects/project_show/task_link"],
  className: "task-link-list-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
})