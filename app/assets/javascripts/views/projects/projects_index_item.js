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

  // add color to project progress number
  colorize: function (percentage) {
    percent = this.$el.find('#percentage-complete')

    if (percentage < 50) {
      percent.addClass("incomplete");
    } else if (percentage < 100) {
      percent.addClass("partial");
    } else if (percentage == 100) {
      percent.addClass("complete");
    }
  },

  destroyProject: function (event) {
    event.preventDefault();
    var yes = confirm("Are you sure you want to delete this project?")
    if (yes) {
      // remove from collection to update number
      // destroy model to remove Backbone model persist deletion to database
      // remove View from DOM
      this.collection.remove(this.model);
      this.model.destroy();
      this.remove();
    }
  },

  render: function () {
    var percentage = (this.model.get("num_complete") / this.model.get("num_tasks") * 100).toFixed(1)
    
    if (isNaN(percentage)) { percentage = 0 };

    var content = this.template({ 
      project: this.model,
      percentage: percentage
    });

    this.$el.html(content);
    this.colorize(percentage);

    return this;
  }
});