BasecampApp.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],
  className: "projects-index",

  events: {
    "click button.add-project": "newProject"
  },

  initialize: function (options) {
    this.tagged = options.tagged;
    this.collection.each(this.addProjectSubview.bind(this));
    this.listenTo(this.collection, 'add', this.addProjectSubview);
    this.listenTo(this.tagged, 'add', this.addTaggedProjectsSubview);
  },

  addTaggedProjectsSubview: function(taggedProject) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      model: taggedProject
    });
    this.addSubview('.projects-tagged-index', subview);
  },

  addProjectSubview: function (project) {
    console.log(project);
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
    $('#main').prepend(projectFormView.render().$el);
  },

  render: function () {
    var content = this.template({ projects: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});