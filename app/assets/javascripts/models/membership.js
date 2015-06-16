BasecampApp.Models.Membership = Backbone.Model.extend({
  urlRoot: function () { 
    return "/api/projects/" + this.get("project_id") + "/memberships";
  }

  // initialize: function (options) {
  //   this.proj = options.project;
  // }
});