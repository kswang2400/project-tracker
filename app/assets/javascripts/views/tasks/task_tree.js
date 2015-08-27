BasecampApp.Views.TaskTree = Backbone.View.extend({
  template: JST["tasks/task_tree"],
  className: "tree-route",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
})