BasecampApp.Collections.Tagged = Backbone.Collection.extend({
  model: BasecampApp.Models.Project,
  url: "/api/projects",

  getOrFetch: function (id) {
    var projects = this;
    var project = projects.get(id);

    if (!project) {
      project = new BasecampApp.Models.Project({ id: id });
      project.fetch({
        success: function () {
          projects.add(project)
        }
      });
    } else {
      project.fetch();
    }

    return project;
  }
});