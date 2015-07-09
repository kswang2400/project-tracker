BasecampApp.Views.TaskIndexItem = Backbone.CompositeView.extend({
  template: JST['tasks/index_item'],
  className: "task-index-item",

  events: {
    'click .complete-task': "completeTask",
    'click .delete-task': "deleteTask",
    'click .view-task': "viewTask"
  },

  attributes: function () {
    return { 'data-task-id': this.model.get('id') }
  },
  
  initialize: function () {
    this.users = new BasecampApp.Collections.Users();
    this.model.assignments().each(this.addAssignedSubview.bind(this));

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.assignments(), 'add', this.addAssignedSubview);
  },

  addAssignedSubview: function (assignment) {
    var user = this.users.getOrFetch(assignment.get("user_id")); 

    var subview = new BasecampApp.Views.AssignedIndexItem({ 
      model: assignment,
      user: user
    });

    this.addSubview('.assigned-users', subview);
  },

  checkEmptyAssignments: function () {
    var notice = this.$el.find(".assigned-users")
    if (notice.is(":empty")) {
      notice.append($("<p>")
        .text("Drop Assignments Here")
        .addClass("no-ass"));
    }
  },

  completeTask: function (event) {
    if (this.model.get('status') !== "completed") {
      this.model.save({ status: "completed" }, { patch: true });
    }

    // move View to completed section?
    this.remove();
    this.collection.add(this.model, { merge: true });
  },

  createAssignment: function (event, ui) {
    var user_id = $(ui.draggable[0]).data('user-id');
    var attrs = {
      user_id: user_id,
      task_id: this.model.id
    };
    
    var assigned_task = new BasecampApp.Models.AssignedTask();

    assigned_task.save(attrs, {
      success: function () {
        this.model.assignments().add(assigned_task);
        $("p.no-ass").remove();
      }.bind(this)
    });
  },

  deleteTask: function () {
    this.model.destroy();
    this.remove();
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.attachSubviews();

    // add visual effects for completed tasks
    if (this.model.get('status') === "completed") {
      this.$el.addClass('completed');
    }

    // initialize droppable plugin on task index item
    setTimeout(function () {
      this.$el.droppable({
        drop: this.createAssignment.bind(this)
      });
    }.bind(this), 0);

    this.checkEmptyAssignments();
    return this;
  },

  viewTask: function (event) {
    event.preventDefault();
    var proj_id = $(event.currentTarget).data('project-id');
    var task_id = this.model.id;
    var link = "/projects/" + proj_id + "/tasks/" + task_id
    Backbone.history.navigate(link, { trigger: true });
  }
});