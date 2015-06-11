BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click button.invite-users': "inviteUsers",
    'click .project-title': "editTitle",
    'click .project-description-text': 'editDescription',
    'click .upload': "upload",
    'blur input': 'uptdateAndSave'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.$el.find('.project-title'), 'dbclick', this.editTitle)
  },

  editTitle: function (event) {
    event.preventDefault();
    var form = new BasecampApp.Views.Editable({ 
      model: this.model, 
      field: "title",
      fieldType: "text"
    });
    this.$el.find('.project-title').html(form.render().$el);
    $(event.currentTarget).removeClass('project-title');
  },

  editDescription: function (event) {
    event.preventDefault();
    var form = new BasecampApp.Views.Editable({ 
      model: this.model, 
      field: "description",
      fieldType: "textarea"
    });
    this.$el.find('.project-description-text').html(form.render().$el);
    $(event.currentTarget).removeClass('project-description-text');
  },

  inviteUsers: function (event) {
    event.preventDefault();
    alert('invite');
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