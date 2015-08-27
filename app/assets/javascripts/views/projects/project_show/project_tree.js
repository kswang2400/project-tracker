BasecampApp.Views.ProjectTree = Backbone.CompositeView.extend({
  template: JST["projects/project_show/project_tree"],
  className: "project-tree",

  initialize: function () {

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    // excuse my fuck-ugly-ness
    $("#tree-route").empty();
    var project_id = this.model.id;

    var project_link = $('<a href="#">')
      .text(this.model.get("title"))
      .addClass("project-link")
      .prepend('<span class="glyphicon glyphicon-tree-conifer btn-lg" aria-hidden="true"></span>');
    
    var project = $("<li>")
      .append(project_link)
      .append($("<ul>").addClass("nav-task-list pre-scrollable hidden"));

    $("body").find("#tree-route").append(project);
    var $task_list = $(".nav-task-list");

    this.model.incomplete_tasks().forEach(function (task) {
      var title = task.get("title");
      var task_id = task.id;

      // so ugly, i said i'm sorry....
      var task_link = $("<a href='/#projects/" + project_id + "/tasks/" + task_id + "'>")
        .text(title)
        .addClass("tree-list-item")
        .prepend('<span class="glyphicon glyphicon-leaf btn-lg" aria-hidden="true"></span>');
      
      $task_list.append(task_link);
    });

    return this;
  }
})