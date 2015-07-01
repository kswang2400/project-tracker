BasecampApp.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['tasks/show'],
  className: "task-show col-md-10 col-md-offset-1",

  events: {
    "click .back-task": "back",
    "click .create-comment": "createComment",
    "click .task-complete": "completeTask",
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.assignments(), 'add', this.addAssignmentSubview);
    this.listenTo(this.model.comments(), 'add', this.addCommentsSubview);
  },

  addAssignmentSubview: function (assignment) {
    var subview = new BasecampApp.Views.AssignedIndexItem({ model: assignment });
    this.addSubview('.task-assignments', subview);
  },

  addCommentsSubview: function (comment) {
    var subview = new BasecampApp.Views.CommentShow({ model: comment });
    this.addSubview('.comments-section', subview);
  },

  back: function (event) {
    window.history.back();
  },

  createComment: function (event) {
    author_id = $(event.currentTarget).data("author-id");
    project_id = this.model.get("project_id");
    task_id = this.model.id;
    debugger;
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  completeTask: function (event) {
    if (this.model.get('status') !== "completed") {
      this.model.save({ status: "completed" }, { patch: true });
    }
  }
});