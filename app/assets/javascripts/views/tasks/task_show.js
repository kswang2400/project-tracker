BasecampApp.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['tasks/show'],
  className: "task-show col-md-10 col-md-offset-1",

  events: {
    "click .back-task": "back",
    "click .create-comment": "createComment",
    "click .task-complete": "completeTask",
  },

  initialize: function () {
    this.users = new BasecampApp.Collections.Users();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.assignments(), 'add', this.addAssignmentSubview);
    this.listenTo(this.model.comments(), 'add', this.addCommentsSubview);
    this.addNavBarSubview();
  },

  addAssignmentSubview: function (assignment) {
    var user = this.users.getOrFetch(assignment.get("user_id")); 

    var subview = new BasecampApp.Views.AssignedIndexItem({ 
      model: assignment,
      user: user 
    });
    this.addSubview('.task-assignments', subview);
  },

  addCommentsSubview: function (comment) {
    var subview = new BasecampApp.Views.CommentShow({ model: comment });
    this.addSubview('.comments-section', subview);
  },

  addNavBarSubview: function () {
    var subview = new BasecampApp.Views.NavBar({
      tagged: false,
      projects: false
    });
    this.addSubview('#backbone-sidebar', subview);
  },

  completeTask: function (event) {
    if (this.model.get('status') !== "completed") {
      this.model.save({ status: "completed" }, { patch: true });
    }
  },

  back: function (event) {
    window.history.back();
  },

  createComment: function (event) {
    event.preventDefault();
    debugger;
    var attrs = $('textarea#comment-body').serializeJSON();
    var that = this;
    attrs["comment"]["project_id"] = this.model.get("project_id");
    attrs["comment"]["task_id"] = this.model.id;

    var comment = new BasecampApp.Models.Comment()
    comment.save(attrs["comment"], {
      success: function () {
        that.model.comments().add(comment);
      }
    });
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);

    if (this.model.get("status") === "completed") {
      $('#task-status').addClass("complete");
    } else {
      $('#task-status').addClass("incomplete");
    }

    this.attachSubviews();

    // scroll to bottom for most recent comments
    var comments = $('.comments-section')
    comments.scrollTop(comments.prop("scrollHeight"));

    return this;
  }
});