BasecampApp.Views.TaskIndexItem = Backbone.CompositeView.extend({
  template: JST['tasks/index_item'],
  className: "task-index-item",
  id: "droppable",

  events: {
    'click .complete-task': "completeTask",
    'click .delete-task': "deleteTask"
  },

  attributes: function () {
    return { 'data-task-id': this.model.get('id') }
  },

  initialize: function (options) {
    this.project = options.project
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.users(), 'add', this.addAssignedSubview);
    this.model.users().each(this.addAssignedSubview.bind(this));
  },

  addAssignedSubview: function (assigned_user) {
    var subview = new BasecampApp.Views.AssignedIndexItem({
      model: assigned_user
    });
    this.addSubview('.assigned-users', subview);
  },

  completeTask: function (event) {
    if (this.model.get('status') === "completed") {
      this.model.save({ status: "incomplete"}, { patch: true});
    } else {
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
      // this.$el.append($("<img>")
      //   .attr("src", "http://ajax.raffertyaluminum.com/pics/completed_stamp.gif")
      //   .addClass("complete-stamp pull-right"));

      this.$el.addClass('completed');
    }

    setTimeout(function () {
      this.$el.droppable({
        drop: function(event, ui) {
          var user_id = $(ui.draggable[0]).data('id')
          var task_id = $(event.target).data('task-id')
          var attrs = {
            user_id: user_id,
            task_id: task_id
          }
          var assigned_task = new BasecampApp.Models.AssignedTask();

          assigned_task.save(attrs);
        }.bind(this)
      });
    }.bind(this), 0);
    return this;
  }
});