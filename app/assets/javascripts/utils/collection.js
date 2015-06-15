_.extend(Backbone.Collection, {
  getOrFetch: function (id) {
    var projects = this;
    var project = projects.get(id);

    if (!project) {
      project = new this.model({ id: id });
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