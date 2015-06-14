BasecampApp.Collections.Memberships = Backbone.Collection.extend({
  model: BasecampApp.Models.Membership,
  url: function () { 
    return "/api/projects/" + this.project.id + "/memberships";
  },
  
  initialize: function (options) {
    this.project = options.project;
  },

  getOrFetch: function (id) {
    var memberships = this;
    var membership = memberships.get(id);

    if (!membership) {
      membership = new BasecampApp.Models.memberships({ id: id });
      membership.fetch({
        success: function () {
          memberships.add(membership)
        }
      });
    } else {
      membership.fetch();
    }

    return membership;
  }
})