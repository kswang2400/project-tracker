BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click button.invite-users': "inviteUsers",
    'click .project-title': "editTitle"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.$el.find('.project-title'), 'dbclick', this.editTitle)
  },

  editTitle: function (event) {
    event.preventDefault();
    alert('editing')
  },

  inviteUsers: function (event) {
    event.preventDefault();
    alert('invite');
    this.$el.find('.project-title')
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});