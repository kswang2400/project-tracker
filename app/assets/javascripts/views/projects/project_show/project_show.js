BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST["projects/project_show/show2"],
  className: "project-show",

  events: {
    "click #new-task": "newTask",
    "click .project-link": "showTree"
  },

  initialize: function () {
    this.users = new BasecampApp.Collections.Users();

    this.model.completed_tasks().each(this.addTaskSubview.bind(this));
    this.model.incomplete_tasks().each(this.addTaskSubview.bind(this));

    this.listenToOnce(this.model, "sync", this.render);
    this.listenToOnce(this.model, "sync", this.addSideBarSubview);

    this.listenTo(this.model.completed_tasks(), "add", this.addTaskSubview);
    this.listenTo(this.model.incomplete_tasks(), "add", this.addTaskSubview);
    
    this.addNavBarSubview();
    this.addProjectTreeSubview();
  },


  addNavBarSubview: function () {
    var subview = new BasecampApp.Views.NavBar({
      collection: this.users,
      model: this.model
    });
    this.addSubview("#backbone-sidebar", subview);
  },

  addProjectTreeSubview: function () {
    var subview = new BasecampApp.Views.ProjectTree({
      model: this.model
    });
    this.addSubview("#tree-route", subview);
  },

  addSideBarSubview: function () {
    var subview = new BasecampApp.Views.ProjectShowSidebar({
      model: this.model
    });
    this.addSubview("#project-show-sidebar", subview);
  },

  addTaskSubview: function (task) {
    var subview = new BasecampApp.Views.TaskIndexItem({ 
      model: task,
      collection: this.model.completed_tasks()
    });

    if (task.get("status") === "completed") {
      this.addSubview(".tasks-container-body-completed", subview);
    } else {
      this.addSubview(".tasks-container-body-incomplete", subview);
    }
  },

  newTask: function (event) {
    event.preventDefault();
    var taskForm = new BasecampApp.Views.TaskForm({
      model: new BasecampApp.Models.Task({ project: this.model }),
      project: this.model,
      collection: this.model.incomplete_tasks()
    });
    $("#main").prepend(taskForm.render().$el);
  },

  render: function () { 
    var content = this.template({ project: this.model });
    this.$el.html(content); 
    this.attachSubviews(); 

    setTimeout(function () {
      this.$el.find("#droppable-member").droppable({
        drop: function(event, ui) {
          if ($(ui.draggable[0]).data("task-id") === undefined) {
            var membership = this.model.memberships().get($(ui.draggable[0]).data("id"));
            membership.destroy();
          } else {
            alert("You can only delete project memberships here");
          }
        }.bind(this)
      });

      this.$el.find("#droppable-assignment").droppable({
        drop: function(event, ui) {
          if ($(ui.draggable[0]).data("task-id") === undefined) {
            alert("You can only delete tasks assignments here");
            return;
          }
          var taskId = $(ui.draggable[0]).data("task-id");
          var assignmentId = $(ui.draggable[0]).data("id");

          var task = this.model.incomplete_tasks().get(taskId);
          var assignment = task.assignments().get(assignmentId);

          assignment.destroy();
        }.bind(this)
      });
    }.bind(this), 0);

    return this;
  },

  showTree: function (event) {
    event.preventDefault();
    $(".nav-task-list").toggleClass("hidden");
    $("#customer-question").addClass("hidden");
  }
});