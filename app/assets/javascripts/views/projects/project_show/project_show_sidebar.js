BasecampApp.Views.ProjectShowSidebar = Backbone.CompositeView.extend({
  template: JST["projects/project_show/sidebar"],
  className: "project-show-sidebar",

  intialize: function () {
    this.listenTo(this.model, "change", this.render);
  },
  
  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})