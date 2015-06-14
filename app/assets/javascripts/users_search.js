$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input[name=username]");
  this.$ul = this.$el.find(".users");

  this.$input.on("keyup", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
  if (this.$input.val() === "") {
    this.renderResults([]);
    return;
  }

  var users = new BasecampApp.Collections.Users();
  users.fetch({
    data: {
      query: this.$input.val()
    },

    success: function (collection) {
      $('ul.users').empty();
      collection.each(function (user) {
        var resultView = new BasecampApp.Views.Result({
          model: user
        });
        $('ul.users').append(resultView.render().$el);
      });
    }
  })
};

$.UsersSearch.prototype.renderResults = function (users) {
  this.$ul.empty();

  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var $a = $("<a></a>");
    $a.text(user.username);
    $a.attr("href", "/users/" + user.id);

    var $li = $("<li></li>");
    $li.append($a);

    this.$ul.append($li);
  }
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};