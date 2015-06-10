BasecampApp.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  initialize: function () {
    this.collection.each(this.addProjectSubview.bind(this));
    this.listenTo(this.collection, 'add', this.addProjectSubview);
  },

  addProjectSubview: function (project) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      model: project,
      id: project.get('id')
    });
    this.addSubview('.projects-index', subview);
  },

  render: function () {
    var content = this.template({ projects: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});