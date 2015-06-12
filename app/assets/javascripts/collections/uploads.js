BasecampApp.Collections.Uploads = Backbone.Collection.extend({
  model: BasecampApp.Models.Upload,
  url: "/api/uploads",

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