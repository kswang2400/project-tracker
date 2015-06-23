BasecampApp.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['tasks/show'],
  className: "task-show col-md-10 col-md-offset-1",

  events: {
    "click .back-task": "back",
    "click .create-comment": "createComment",
    "click .task-complete": "toggleStatus"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.assignments(), 'add', this.addAssignmentSubview);
    // this.listenTo(this.model.comments(), 'add', this.addCommentsSubview);
    this.addCommentsSubview();
  },

  addAssignmentSubview: function (assignment) {
    var subview = new BasecampApp.Views.AssignedIndexItem({ model: assignment });
    this.addSubview('.task-assignments', subview);
  },

  addCommentsSubview: function (comment) {
    var subview = new BasecampApp.Views.CommentsShow({ model: comment });
    this.addSubview('.comments-section', subview);
  },

  back: function (event) {
    event.preventDefault();
    window.history.back();
  },

  createComment: function (events) {
    event.preventDefault();
    debugger;
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toggleStatus: function (event) {
    if (this.model.get('status') === "completed") {
      this.model.save({ status: "incomplete"}, { patch: true});
    } else {
      this.model.save({ status: "completed" }, { patch: true });
    }
  }
});