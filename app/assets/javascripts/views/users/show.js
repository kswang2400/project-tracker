BasecampApp.Views.UsersShow = Backbone.CompositeView.extend({
  template: JST["users/show"],
  className: "user-show",

  events: {
    "click #assign-repo": "linkGithub",
    "click #update-info": "showEdit",
    "click #upload-prof-pic": "upload",
    "click #user-task-list": "showTask",
    "click #user-show-info": "showInfo",
    "submit": "editInfo"
  },

  initialize: function () {
    this.users = new BasecampApp.Collections.Users();

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.tasks(), "add", this.addTaskListItem);
    this.listenTo(this.model.completed(), "add", this.addCompletedTaskListItem);

    this.addNavBarSubview();
  },

  addCompletedTaskListItem: function (task) {
    var subview = new BasecampApp.Views.UserTaskListItem({ model: task });
    this.addSubview(".to-do-list#completed", subview);
  },

  addNavBarSubview: function () {
    var subview = new BasecampApp.Views.NavBar({
      tagged: false,
      projects: false
    });
    this.addSubview("#backbone-sidebar", subview);
  },

  addTaskListItem: function (task) {
    var subview = new BasecampApp.Views.UserTaskListItem({ model: task });
    this.addSubview(".to-do-list#to-do", subview);
  },

  editInfo: function (event) {
    event.preventDefault();
    var new_attr = this.$el.find("form").serializeJSON();
    this.model.save(new_attr["user"]);
  },

  linkGithub: function (event) {
    event.preventDefault();
    var github = new BasecampApp.Views.GithubForm({
      repos: this.model.repos(),
      username: this.model.get("username")
    });
    $('#main').prepend(github.render().$el);
  },

  render: function () {
    var completed = this.model.completed().length
    var incomplete = this.model.tasks().length

    var content = this.template({ 
      user: this.model,
      completed: completed,
      incomplete: incomplete,
    });

    this.$el.html(content);
    this.attachSubviews(); 
    return this;
  },

  showEdit: function () {
    this.$el.find(".user-show-edit").removeClass("hidden");
    this.$el.find(".user-show-tasks").addClass("hidden");
    this.$el.find(".user-show-info").addClass("hidden");
  },

  showInfo: function () {
    this.$el.find(".user-show-info").removeClass("hidden");
    this.$el.find(".user-show-edit").addClass("hidden");
    this.$el.find(".user-show-tasks").addClass("hidden");
  },

  showTask: function () {
    this.$el.find(".user-show-tasks").removeClass("hidden");
    this.$el.find(".user-show-edit").addClass("hidden");
    this.$el.find(".user-show-info").addClass("hidden");
  },

  upload: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS, function(error, payload) {
      var attrs = { profile_picture: payload[0].url };
      this.model.save(attrs);
    }.bind(this));
  }
})