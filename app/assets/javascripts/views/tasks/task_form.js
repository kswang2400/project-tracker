BasecampApp.Views.TaskForm = Backbone.Modal.extend({
  template: JST["tasks/form"],
  className: "modal-container",

  events: {
    "submit": "createTask",
    "keyup": "esc",
    "click .modal-backdrop": "removeModal"
  },
  
  initialize: function (options) {
    this.project = options.project;
  },

  createTask: function (event) {
    event.preventDefault();
    var attrs = this.$el.find(".new-form").serializeJSON();
    var that = this;

    this.model.save(attrs["task"], {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("#projects/" + that.project.id, { trigger: true });
        that.$el.remove();
      }
    })
  },

  render: function () {
    var content = this.template({ 
      task: this.model,
      project: this.project
    });
    this.$el.html(content);
    return this;
  }
});