BasecampApp.Views.GithubForm = Backbone.CompositeView.extend({
  template: JST["projects/github"],
  className: "modal-container",

  events: {
    "click .modal-backdrop": "removeModal",
    "keydown": "esc",
    "submit": "createNewProject"
  },

  initialize: function (options) {
    this.repos = options.repos;
    this.username = options.username;
  },

  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

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

  removeModal: function () {
    this.remove();
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