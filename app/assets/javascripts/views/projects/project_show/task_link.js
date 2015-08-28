BasecampApp.Views.TaskLink = Backbone.View.extend({
  template: JST["projects/project_show/task_link"],
  tagName: "li",
  className: "task-link-list-item",
  id: function () {
    return this.model.get("id");
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
})