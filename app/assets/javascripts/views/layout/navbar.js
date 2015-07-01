BasecampApp.Views.Navbar = Backbone.View.extend({
  template: JST['layout/navbar'],

  render: function () {
    var content = this.template({ 
      // need to pass in tagged and projects, will try to refactor later
    });
  }
});