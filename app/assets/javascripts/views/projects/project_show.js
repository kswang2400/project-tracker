BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click .invite-users': "inviteUsers",
    'click .new-task': "newTask",
    'click .project-title': "editTitle",
    'click .project-description-text': "editDescription",
    'click .tag-user': "tagUser",
    'click .upload-button': "upload",
    'blur input.editing': "updateAndSave",
    'blur textarea': "updateAndSave"
  },

  initialize: function (options) {
    // this.uploads = options.uploads;
    // this.memberships = options.memberships;
    // this.tasks = options.tasks;

    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model.memberships(), 'add', this.addMembershipSubview);
    this.listenTo(this.model.uploads(), 'add', this.addUploadSubview);
    this.listenTo(this.model.tasks(), 'add', this.addTaskSubview);
    this.addUsersSearchSubview();
  },

  addMembershipSubview: function (membership) {
    var subview = new BasecampApp.Views.MembershipIndexItem({
      model: membership
    });
    this.addSubview('.list-collaborators', subview);
  },

  addTaskSubview: function (task) {
    var subview = new BasecampApp.Views.TaskIndexItem({ 
      model: task,
      project: this.model
    });
    this.addSubview('.tasks-container-body', subview);
  },

  addUploadSubview: function (upload) {
    var subview = new BasecampApp.Views.UploadsIndexItem({ model: upload });
    this.addSubview('.carousel-inner', subview);
    this.$('.item').first().addClass('active');
  },

  addUsersSearchSubview: function () {
    var subview = new BasecampApp.Views.UsersSearch();
    this.addSubview('.project-user-search', subview);
  },

  editTitle: function (event) {
    event.preventDefault();
    var $input = $('<input>')
      .addClass('project-title editing')
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
      .addClass('project-description-text editing')
      .data("attr", 'description')
      .data("input", "textarea")
      .val($(event.currentTarget).html());

    this.$el.find('.project-description-text').html($input);
    $input.focus();
    this.$el.find('.project-description-text').removeClass('project-description-text')
  },

  inviteUsers: function (event) {
    event.preventDefault();
    this.$el.find('.project-user-search').toggleClass('hidden');
    $('body').find('.users-search').usersSearch();
  },

  newTask: function (event) {
    event.preventDefault();
    var taskForm = new BasecampApp.Views.TaskForm({
      model: new BasecampApp.Models.Task({ project: this.model }),
      project: this.model,
      collection: this.tasks
    });
    $('#main').prepend(taskForm.render().$el);
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();

    setTimeout(function () {
      this.$el.find('#droppable').droppable({
        drop: function(event, ui) {
          var membership = this.memberships.get($(ui.draggable[0]).data('id'));
          membership.destroy();
        }.bind(this)
      });
    }.bind(this), 0);

    return this;
  },

  tagUser: function (event) {
    var userId = $(event.currentTarget).attr('id')
    var attr = { user_id: userId }

    var membership = new BasecampApp.Models.Membership({
      project_id: this.model.id
    });

    membership.save(attr, {
      success: function () {
        this.memberships.fetch();
        this.$el.find('.project-user-search').toggleClass('hidden');
      }.bind(this)
    });
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
      new BasecampApp.Models.Upload({ project: this.model }).save(attrs, {
        success: function () {
          this.uploads.fetch();
        }.bind(this)
      });
    }.bind(this));
  }
});