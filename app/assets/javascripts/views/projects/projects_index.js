BasecampApp.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],
  className: "projects-index",

  events: {
    "click button.add-project": "newProject",
    "click li.sb-my-projects": "myProjects",
    "click li.sb-tagged-projects": "taggedProjects"
  },

  initialize: function (options) {
    this.tagged = options.tagged;
    this.collection.each(this.addProjectSubview.bind(this));
    this.listenTo(this.collection, 'add', this.addProjectSubview);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.tagged, 'add', this.addTaggedProjectsSubview);
    this.listenTo(this.tagged, 'sync', this.render);
  },
  
  addTaggedProjectsSubview: function(taggedProject) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      model: taggedProject
    });
    this.addSubview('.projects-tagged-index', subview);
  },

  addProjectSubview: function (project) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      model: project
    });
    this.addSubview('.projects-owned-index', subview);
  },

  myProjects: function (event) {
    event.preventDefault();
    $('.my-projects').addClass("glyphicon-folder-open").removeClass("glyphicon-folder-close");
    $('.tagged-projects').addClass("glyphicon-folder-close").removeClass("glyphicon-folder-open");
    $('.projects-owned').addClass("active").removeClass("inactive");
    $('.projects-tagged').removeClass("active").addClass("inactive");
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
    var content = this.template({ 
      projects: this.collection,
      tagged: this.tagged
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  taggedProjects: function (event) {
    event.preventDefault();
    $('.tagged-projects').addClass("glyphicon-folder-open").removeClass("glyphicon-folder-close");
    $('.my-projects').addClass("glyphicon-folder-close").removeClass("glyphicon-folder-open");
    $('.projects-owned').removeClass("active").addClass("inactive");
    $('.projects-tagged').addClass("active").removeClass("inactive");
  }
});