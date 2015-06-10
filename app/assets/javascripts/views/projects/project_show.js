BasecampApp.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['projects/show'],
  className: "project-show clearfix",

  events: {
    'click button': "inviteUsers"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  inviteUsers: function () {
    
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});