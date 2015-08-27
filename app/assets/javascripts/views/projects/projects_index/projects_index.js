BasecampApp.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST["projects/projects_index/index2"],
  className: "projects-index",

  events: {
    "click button.add-project": "newProject",
  },

  initialize: function (options) {
    this.tagged = options.tagged;

    this.collection.each(this.addProjectSubview.bind(this));

    this.listenTo(this.collection, "add", this.addProjectSubview);
    this.listenTo(this.collection, "sync", this.render);

    this.listenTo(this.tagged, "add", this.addTaggedProjectsSubview);
    this.listenTo(this.tagged, "sync", this.render);

    this.listenTo(this.collection, "remove", this.removeProjectSubview);
    this.listenTo(this.tagged, "remove", this.removeTaggedSubview);

    this.addNavBarSubview();
  },

  addNavBarSubview: function () {
    var subview = new BasecampApp.Views.NavBar({
      tagged: this.tagged,
      projects: this.collection
    });
    this.addSubview("#backbone-sidebar", subview);
  },
  
  addTaggedProjectsSubview: function(taggedProject) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      collection: this.tagged,
      model: taggedProject
    });
    this.addSubview(".projects-tagged-index", subview);
  },

  addProjectSubview: function (project) {
    var subview = new BasecampApp.Views.ProjectsIndexItem({
      collection: this.collection,
      model: project
    });
    this.addSubview(".projects-owned-index", subview);
  },

  newProject: function (event) {
    event.preventDefault();
    var projectFormView = new BasecampApp.Views.ProjectForm({
      model: new BasecampApp.Models.Project(),
      collection: this.collection
    });
    $("#main").prepend(projectFormView.render().$el);
  },
  
  removeProjectSubview: function (project) {
    this.removeModelSubview(".projects-owned-index", project);
  },

  removeTaggedSubview: function (tagged) {
    this.removeModelSubview(".projects-tagged-index", tagged);
  },

  render: function () {
    var content = this.template({ 
      projects: this.collection,
      tagged: this.tagged
    });
    this.$el.html(content);
    this.attachSubviews();

    setTimeout(function () {
      $(".projects-owned-index").sortable();
      $(".projects-tagged-index").sortable();
    });

    return this;
  }
});