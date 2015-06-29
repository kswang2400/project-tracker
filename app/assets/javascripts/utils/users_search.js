// define attributes of the plugin
$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input[name=username]"); // input field with typeahead
  this.$ul = this.$el.find(".users"); // users ul to display queried results

  this.$input.on("keyup", this.handleInput.bind(this));
};

// render new results on each keypress
$.UsersSearch.prototype.handleInput = function (event) {
  // empty search string brings up all users, otherwise query on username
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

// function to install plugin on html selector
$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};