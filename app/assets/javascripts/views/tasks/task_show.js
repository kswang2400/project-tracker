BasecampApp.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['tasks/show'],
  className: "task-show col-md-10 col-md-offset-1",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.assignments(), 'add', this.addAssignmentSubview);
  },

  addAssignmentSubview: function (assignment) {
    var subview = new BasecampApp.Views.AssignedIndexItem({ model: assignment });
    this.addSubview('.task-assignments', subview);
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});