BasecampApp.Views.Editable = Backbone.View.extend({
  template: JST['projects/editable'],
  tagName: this.fieldType,
  events: {
    'click .edit': "edit"
  },

  initialize: function (options) {
    this.field = options.field;
    this.fieldType = options.fieldType;
  },

  edit: function (event) {
    event.preventDefault();
    var new_attr = this.$el.find('form').serializeJSON();
    this.model.save(new_attr);
  },

  render: function () {
    var content = this.template({ 
      project: this.model,
      attr: this.field,
      fieldType: this.fieldType
    });
    this.$el.html(content);
    return this;
  }
});