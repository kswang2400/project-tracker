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
    var user_id = assignment.get("user_id"); 
    var user = this.users.getOrFetch(user_id);

    var subview = new BasecampApp.Views.AssignedIndexItem({ model: user });
    this.addSubview('.assigned-users', subview);
  },

  completeTask: function (event) {
    if (this.model.get('status') !== "completed") {
      this.model.save({ status: "completed" }, { patch: true });
    }
  },

  deleteTask: function () {
    this.model.destroy()
    this.remove();
  },

  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    this.attachSubviews();

    if (this.model.get('status') === "completed") {
      this.$el.addClass('completed');
    }

    setTimeout(function () {
      this.$el.droppable({
        drop: function(event, ui) {
          var user_id = $(ui.draggable[0]).data('user-id')
          var task_id = $(event.target).data('task-id')
          var attrs = {
            user_id: user_id,
            task_id: task_id
          }
          
          var assigned_task = new BasecampApp.Models.AssignedTask();

          assigned_task.save(attrs, {
            success: function () {
              this.model.assignments().add(assigned_task);
            }.bind(this)
          });
        }.bind(this)
      });
    }.bind(this), 0);
    return this;
  },

  viewTask: function (event) {
    event.preventDefault();
    var proj_id = $(event.currentTarget).data('project-id');
    var task_id = this.model.get('id');
    var link = "/projects/" + proj_id + "/tasks/" + task_id
    Backbone.history.navigate(link, { trigger: true });
  }
});