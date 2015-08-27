BasecampApp.Views.ProjectShowSidebar = Backbone.CompositeView.extend({
  template: JST["projects/project_show/sidebar"],

  initialize: function () {
    this.listenTo(this.model, "change", this.render);

    this.model.memberships().each(this.addMembershipSubview.bind(this));
    this.model.uploads().each(this.addUploadSubview.bind(this));

    this.listenTo(this.model.memberships(), "add", this.addMembershipSubview);
    this.listenTo(this.model.uploads(), "add", this.addUploadSubview);

    this.addUsersSearchSubview();
  },

  addMembershipSubview: function (membership) {
    var subview = new BasecampApp.Views.MembershipIndexItem({ 
      model: membership,
    });
    this.addSubview(".list-collaborators", subview);
  },

  addUploadSubview: function (upload) {
    var subview = new BasecampApp.Views.UploadsIndexItem({ model: upload });
    this.addSubview(".carousel-inner", subview);
    this.$(".item").first().addClass("active");
  },

  addUsersSearchSubview: function () {
    var subview = new BasecampApp.Views.UsersSearch({
      collection: this.collection
    });
    this.addSubview(".project-user-search", subview);
  },
  
  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})