BasecampApp.Views.TaskIndexItem = Backbone.View.extend({
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

    if (this.model.get('status') === "completed") {
      this.$el.append($("<img>")
        .attr("src", "http://ajax.raffertyaluminum.com/pics/completed_stamp.gif")
        .addClass("complete-stamp pull-right"));
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
          debugger;
          var assigned_task = new BasecampApp.Models.AssignedTask();
          assigned_task.save(attrs, {
            success: function () {
              alert('success!')
            }
          });
          Backbone.history.navigate("/#", { trigger: true });
        }.bind(this)
      });
    }.bind(this), 0);
    return this;
  }
});