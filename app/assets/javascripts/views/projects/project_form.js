BasecampApp.Views.ProjectForm = Backbone.Modal.extend({
  template: JST['projects/form'],
  className: "modal-container",
  
  events: function () {
    return _.extend({}, Backbone.Modal.prototype.events, {
      "submit": "createNewProject"
    });
  },

  // serialize data from form to create a new project
  createNewProject: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('.new-form').serializeJSON();
    var that = this;

    this.model.save(attrs['project'], {
      success: function () {
        // add new project to collection so you don't have to refetch
        that.collection.add(that.model);
        that.$el.remove(); 
      }
    })
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});