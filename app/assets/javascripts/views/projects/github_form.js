BasecampApp.Views.GithubForm = Backbone.CompositeView.extend({
  template: JST["projects/github"],
  className: "modal-container",

  events: {
    "click #github-input": "findRepos",
    "click .modal-backdrop": "removeModal",
    "keydown": "esc",
    "submit": "createNewProject"
  },

  initialize: function () {
    // debugger;
  },

  esc: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  findRepos: function (event) {
    event.preventDefault();
    debugger;
  },

  linkGithub: function (event) {
    event.preventDefault();
    var username = $("textarea");
  },

  removeModal: function () {
    this.remove();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }  
});