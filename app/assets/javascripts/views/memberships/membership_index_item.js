BasecampApp.Views.MembershipIndexItem = Backbone.View.extend({
  template: JST["memberships/index_item"],
  className: "member-circle-img",

  attributes: function () {
    return { 
      "data-user-id": this.model.get("user_id"),
      "data-id": this.model.id,
      "style": "z-index: 1000"
    }
  },

  initialize: function (options) {
    this.user = options.user

    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.model, "sync", this.render);
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