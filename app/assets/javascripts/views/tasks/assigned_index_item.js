BasecampApp.Views.AssignedIndexItem = Backbone.View.extend({
  template: JST["tasks/assigned_index_item"],
  className: "member-circle-img",


  attributes: function () {
    return {
      "data-id": this.model.id,
      "data-user-id": this.model.get("user_id"),
      "data-task-id": this.model.get("task_id")
    }
  },

  initialize: function () {
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function () {
    var content = this.template({ assignment: this.model });
    this.$el.html(content);
    
    setTimeout(function () {
      this.$el.draggable({ revert: true });
    }.bind(this), 0)

    return this;
  }
});