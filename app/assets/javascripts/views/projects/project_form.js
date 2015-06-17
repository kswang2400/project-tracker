BasecampApp.Views.ProjectForm = Backbone.CompositeView.extend({
  template: JST['projects/form'],
  className: "modal-container",

  events: {
    "submit": "createNewProject",
    'keydown': 'esc',
    "click .modal-backdrop": "removeModal"
  },

  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  createNewProject: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('.new-form').serializeJSON();
    var that = this;

    this.model.save(attrs['project'], {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("#projects/" + that.model.get('id'), { trigger: true });
        that.$el.find('.new-project').remove();
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