BasecampApp.Views.ProjectForm = Backbone.CompositeView.extend({
  template: JST['projects/form'],
  className: "modal-container",

  events: {
    "submit": "createNewProject",
    'keydown': 'esc',
    "click .modal-backdrop": "removeModal"
  },

  // delete modal form on "esc" keypress
  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  // serialize data from form to create a new project
  createNewProject: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('.new-form').serializeJSON();
    var that = this;

    this.model.save(attrs['project'], {
      success: function () {
        // add new project to collection so you don't have to refetch
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("#projects/" + that.model.get('id'), { trigger: true });
        that.$el.find('.new-project').remove(); // remove form from DOM
      }
    })
  },

  removeModal: function () {
    this.remove();
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});