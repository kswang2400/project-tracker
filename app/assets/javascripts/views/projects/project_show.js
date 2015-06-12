BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click button.invite-users': "inviteUsers",
    'click .project-title': "editTitle",
    'click .project-description-text': 'editDescription',
    'click .upload': "upload",
    'blur input': 'updateAndSave',
    'blur textarea': 'updateAndSave'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.$el.find('.project-title'), 'dbclick', this.editTitle)
  },

  editTitle: function (event) {
    event.preventDefault();
    var $input = $('<input>')
      .addClass('project-title-editing')
      .data("attr", 'title')
      .data("input", "input")
      .val($(event.currentTarget).html());

    this.$el.find('.project-title').html($input);
    $input.focus();
    this.$el.find('.project-title').removeClass('project-title')
  },

  editDescription: function (event) {
    event.preventDefault();
    var $input = $('<textarea>')
      .addClass('project-description-text-editing')
      .data("attr", 'description')
      .data("input", "textarea")
      .val($(event.currentTarget).html());

    this.$el.find('.project-description-text').html($input);
    $input.focus();
    this.$el.find('.project-description-text').removeClass('project-description-text')
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

  updateAndSave: function (event) {
    var attr = $(event.currentTarget).data('attr');
    var input = $(event.currentTarget).data('input');
    var newAttr = {};
    newAttr[attr] = this.$el.find(input).val();
    this.model.save(newAttr);
  },

  upload: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS, function(error, payload) {
      var attrs = {
        url: payload[0].url,
        thumbnail_url: payload[0].thumbnail_url
      };
      new BasecampApp.Models.Upload().set(attrs).save();
    });
  }
});