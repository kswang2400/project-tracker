BasecampApp.Views.MembershipIndexItem = Backbone.View.extend({
  template: JST['memberships/index_item'],
  className: "member-circle-img",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    // debugger;
    var content = this.template({ membership: this.model });
    this.$el.html(content);
    return this;
  }
});