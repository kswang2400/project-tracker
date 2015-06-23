BasecampApp.Views.UserTaskListItem = Backbone.View.extend({
  template: JST['tasks/user_task_list_item'],

  intialize: function () {
    debugger;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
});