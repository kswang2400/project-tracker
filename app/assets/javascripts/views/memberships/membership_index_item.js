BasecampApp.Views.MembershipIndexItem = Backbone.View.extend({
  template: JST['memberships/index_item'],
  className: "member-circle-img",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ membership: this.model });
    this.$el.html(content);

    // hacking profile pictures for now -__-
    switch(this.model.get('user_id')) {
      case 1:
        this.$el.find('.member').attr('id', 'c1');
        break;
      case 2:
        this.$el.find('.member').attr('id', 'c2');
        break;
      case 3:
        this.$el.find('.member').attr('id', 'c3');
        break;
    }

    return this;
  }
});