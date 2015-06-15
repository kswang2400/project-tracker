BasecampApp.Views.TaskForm = Backbone.CompositeView.extend({
  template: JST['tasks/form'],
  className: "modal-container",

  events: {
    "submit": "taskForm",
    'keydown': 'esc',
    "click .modal-backdrop": "removeModal",
    "click .close-button": "removeModal" //ActionController::InvalidAuthenticityToken
  },

  initialize: function (options) {
    this.project = options.project;
  },

  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  taskForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('.new-task').serializeJSON();
    var that = this;

    this.model.save(attrs['task'], {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("#projects/" + that.project.id, { trigger: true });
        that.$el.remove();
      }
    })
  },

  removeModal: function (event) {
    event.preventDefault();
    this.remove();
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