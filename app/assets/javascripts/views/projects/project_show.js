BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click button.edit-project': "editProject"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  editProject: function (event) {
    event.preventDefault();
    debugger;
  },

  inviteUsers: function (event) {
    event.preventDefault();
    alert('invite');
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});