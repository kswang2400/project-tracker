BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click button.invite-users': "inviteUsers",
    'click .project-title': "editTitle",
    'click .upload': "upload"
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
    this.$el.find('.project-title').html
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  },

  upload: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS, function(error, payload) {
      debugger;
    });
  }
});