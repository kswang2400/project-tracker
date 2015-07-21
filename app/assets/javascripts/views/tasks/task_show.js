BasecampApp.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['tasks/show'],
  className: "task-show",

  events: {
    "click .current-task": "eventPreventDefault",
    "click .create-comment": "createComment",
    "click .task-complete": "completeTask",
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.assignments(), 'add', this.addAssignmentSubview);
    this.listenTo(this.model.comments(), 'add', this.addCommentsSubview);

    this.addNavBarSubview();
  },

  addAssignmentSubview: function (assignment) {
    var subview = new BasecampApp.Views.AssignedIndexItem({ 
      model: assignment
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

  backToProject: function () {
    $("#route-back-project").empty();
    var project_id = this.model.get("project_id");

    var link = $("<a href='/#projects/" + project_id + "'>")
      .text(this.model.get("project_title"))
      .prepend('<span class="glyphicon glyphicon-tree-conifer btn-lg" aria-hidden="true"></span>');
    
    var current_task = $("<a href='#'>")
      .text(this.model.get("title"))
      .addClass("tree-list-item current-task")
      .prepend('<span class="glyphicon glyphicon-leaf btn-lg" aria-hidden="true"></span>');

    var link_project = $("<li>")
      .append(link)
      .append($("<ul>").append(current_task));

    $("#route-back-project").append(link_project);
  },

  createComment: function (event) {
    event.preventDefault();
    
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

  eventPreventDefault: function (event) {
    event.preventDefault();
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);

    if (this.model.get("status") === "completed") {
      $('#task-status').addClass("complete");
    } else {
      $('#task-status').addClass("incomplete");
    }

    // scroll to bottom for most recent comments
    var comments = $('.comments-section')
    comments.scrollTop(comments.prop("scrollHeight"));

    this.attachSubviews();
    this.backToProject();
    return this;
  }
});