BasecampApp.Views.UsersShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: 'users-show col-md-8 col-md-offset-2',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tasks(), 'add', this.addTaskListItem);
  },

  addTaskListItem: function (task) {
    var subview = new BasecampApp.Views.UserTaskListItem({ model: task });
    this.addSubview(".to-do-list", subview);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews(); 
    return this;
  }
})