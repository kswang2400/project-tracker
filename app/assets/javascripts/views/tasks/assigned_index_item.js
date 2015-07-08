BasecampApp.Views.AssignedIndexItem = Backbone.View.extend({
  template: JST["tasks/assigned_index_item"],
  className: "member-circle-img",


  attributes: function () {
    return {
      "data-id": this.model.id,
      "data-user-id": this.model.get("user_id"),
      "data-task-id": this.model.get("task_id"),
      "style": "z-index: 10"
    }
  },

  initialize: function (options) {
    this.user = options.user;

    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function () {
    var content = this.template({ user: this.user });
    this.$el.html(content);
    
    setTimeout(function () {
      this.$el.draggable({ revert: true });
    }.bind(this), 0)

    return this;
  }
});