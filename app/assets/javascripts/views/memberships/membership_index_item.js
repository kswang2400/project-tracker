BasecampApp.Views.MembershipIndexItem = Backbone.View.extend({
  template: JST['memberships/index_item'],
  className: "member-circle-img",

  attributes: function () {
    return { 'data-id': this.model.get('user_id') }
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
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
      default:
        this.$el.find('.member').attr('id', 'c-default');
        break;
    }
    //

    setTimeout(function () {
      this.$el.draggable({ revert: true });
    }.bind(this), 0)

    return this;
  }
});