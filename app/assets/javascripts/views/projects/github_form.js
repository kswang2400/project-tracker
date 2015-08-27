BasecampApp.Views.GithubForm = Backbone.Modal.extend({
  template: JST["projects/github"],
  className: "modal-container",

  events: function () {
    return _.extend({}, Backbone.Modal.prototype.events, {
      "submit": "createNewProject"
    });
  },

  initialize: function (options) {
    this.repos = options.repos;
    this.username = options.username;
  }

  linkGithub: function (event) {
    event.preventDefault();
    var username = $("textarea");
  },

  populateList: function () {
    var $reposDropdown = this.$el.find("#repos-dropdown")
    this.repos[0].forEach(function (repo) {
      $reposDropdown.append($("<li>").text(repo).attr("name", repo).addClass("github-list-item"));
    });
  },
  
  render: function () {
    var content = this.template({
      username: this.username
    });
    this.$el.html(content);
    this.populateList();
    return this;
  }  
});