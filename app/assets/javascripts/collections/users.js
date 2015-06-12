BasecampApp.Collections.Users = Backbone.Collection.extend({
  model: BasecampApp.Models.User,
  url: "/users",

  getOrFetch: function (id) {
    var users = this;
    var user = users.get(id);

    if (!user) {
      user = new BasecampApp.Models.users({ id: id });
      user.fetch({
        success: function () {
          users.add(user)
        }
      });
    } else {
      user.fetch();
    }

    return user;
  }
});