BasecampApp.Views.TaskShow = Backbone.View.extend({
  template: JST['tasks/show'],
  className: "task-show",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    debugger;
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
});