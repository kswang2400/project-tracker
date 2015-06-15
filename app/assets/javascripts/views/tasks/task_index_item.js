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
    alert('hello')
  },

  deleteTask: function () {
    this.model.destroy()
    this.remove();
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
});