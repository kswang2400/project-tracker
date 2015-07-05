BasecampApp.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['projects/index_item'],
  tagName: "li",
  className: "projects-index-item",

  events: {
    'click .delete-project': "destroyProject",
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  colorize: function (percentage) {
    // add color to project progress number
    percent = this.$el.find('#percentage-complete')

    if (percentage < 50) {
      percent.addClass("incomplete");
    } else if (percentage < 85) {
      percent.addClass("partial");
    } else if (percentage == 100) {
      percent.addClass("complete");
    }
  },

  destroyProject: function (event) {
    event.preventDefault();
    var yes = confirm("Are you sure you want to delete this project?")
    if (yes) {
      this.model.destroy();
      this.remove();
    }
  },

  render: function () {
    var percentage = (this.model.get("num_complete") / this.model.get("num_tasks") * 100).toFixed(1)
    var content = this.template({ 
      project: this.model,
      percentage: percentage
    });
    this.$el.html(content);
    this.colorize(percentage);

    return this;
  }
});