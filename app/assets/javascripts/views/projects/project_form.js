BasecampApp.Views.ProjectForm = Backbone.CompositeView.extend({
  template: JST['projects/form'],
  className: "modal-container",

  events: {
    "submit": "projectForm",
    "click .modal-backdrop": "removeModal"
  },

  projectForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('.new-project').serializeJSON();
    var that = this;
    
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("#projects/" + that.model.get('id'), { trigger: true });
        that.$el.find('.new-project').remove();
      }
    })
  },

  removeModal: function () {
    $(event.currentTarget).remove();
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});