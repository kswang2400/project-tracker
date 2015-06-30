BasecampApp.Views.UsersShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: 'user-show col-md-8 col-md-offset-2',

  events: { 
    "click .back-user": "back",
    "submit": "editInfo"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tasks(), 'add', this.addTaskListItem);
  },

  addTaskListItem: function (task) {
    var subview = new BasecampApp.Views.UserTaskListItem({ model: task });
    this.addSubview(".to-do-list", subview);
  },

  back: function (event) {
    window.history.back();
  },

  editInfo: function (event) {
    event.preventDefault();
    var new_attr = this.$el.find('form').serializeJSON();
    this.model.save(new_attr["user"]);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews(); 
    return this;
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
          this.model.uploads().fetch();
        }.bind(this)
      });
    }.bind(this));
  }
})