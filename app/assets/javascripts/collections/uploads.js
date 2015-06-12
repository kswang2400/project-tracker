BasecampApp.Collections.Uploads = Backbone.Collection.extend({
  model: BasecampApp.Models.Upload,
  url: function () { return "/api/projects/" + this.project.id + "/uploads" },

  initialize: function (options) {
    this.project = options.project;
  },

  getOrFetch: function (id) {
  var uploads = this;
  var upload = uploads.get(id);

  if (!upload) {
    upload = new BasecampApp.Models.Uploads({ id: id });
    upload.fetch({
      success: function () {
        uploads.add(upload)
      }
    });
  } else {
    upload.fetch();
  }

  return upload;
}
});