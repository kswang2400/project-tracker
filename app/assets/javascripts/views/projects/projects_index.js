BasecampApp.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  events: {
    "click button.add-project": "newProject"
  },

  initialize: function () {
    this.collection.each(this.addProjectSubview.bind(this));
    this.listenTo(this.collection, 'add', this.addProjectSubview);
    this.listenTo(this.subview)
  },

  addProjectSubview: function (project) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      model: project,
      id: project.get('id')
    });
    this.addSubview('.projects-index', subview);
  },

  newProject: function (event) {
    event.preventDefault();
    var projectFormView = new BasecampApp.Views.ProjectForm({
      model: new BasecampApp.Models.Project(),
      collection: this.collection
    });
    this.$el.find('.add-project').hide();
    this.addSubview('.project-form-container', projectFormView);
  },

  render: function () {
    var content = this.template({ projects: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});