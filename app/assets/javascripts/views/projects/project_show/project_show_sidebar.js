BasecampApp.Views.ProjectShowSidebar = Backbone.CompositeView.extend({
  template: JST["projects/project_show/sidebar"],

  events: {
    "click .invite-users": "inviteUsers",
    "click .project-title": "editTitle",
    "click .project-description-text": "editDescription",
    "click .tag-user": "tagUser",
    "click .upload-button": "upload",
    "blur input.editing": "updateAndSave",
    "blur textarea": "updateAndSave"
  },

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

  editTitle: function (event) {
    event.preventDefault();
    var $input = $("<input>")
      .addClass("project-title editing")
      .data("attr", "title")
      .data("input", "input")
      .val($(event.currentTarget).html());

    this.$el.find(".project-title").html($input);
    $input.focus();
    this.$el.find(".project-title").removeClass("project-title");
  },

  editDescription: function (event) {
    event.preventDefault();
    var $input = $("<textarea>")
      .addClass("project-description-text editing")
      .data("attr", "description")
      .data("input", "textarea")
      .val($(event.currentTarget).html());

    this.$el.find(".project-description-text").html($input);
    $input.focus();
    this.$el.find(".project-description-text")
      .addClass("project-description-text-editing")
      .removeClass("project-description-text");
  },

  inviteUsers: function (event) {
    event.preventDefault();
    var searchBar = this.$el.find(".project-user-search");
    searchBar.toggleClass("hidden");
    $("body").find(".users-search").usersSearch();

    if (searchBar.hasClass("hidden")) {
      this.$el.find(".project-show-upload-bar").removeClass("hidden");
    } else {
      this.$el.find(".project-show-upload-bar").addClass("hidden");
    }
  },
  
  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  tagUser: function (event) {
    var userId = $(event.currentTarget).attr("id");
    var attr = { user_id: userId };

    var membership = new BasecampApp.Models.Membership({
      project_id: this.model.id
    });

    membership.save(attr, {
      success: function () {
        this.model.memberships().add(membership, { merge: true });
        this.$el.find(".project-user-search").toggleClass("hidden");
        this.$el.find(".project-show-upload-bar").removeClass("hidden");
      }.bind(this)
    });
  },

  updateAndSave: function (event) {
    var attr = $(event.currentTarget).data("attr");
    var input = $(event.currentTarget).data("input");
    var newAttr = {};
    newAttr[attr] = $("#project-show-main").find(input).val();
    this.model.save(newAttr);

    if (attr === "title") {
      $("h1#project-title").remove("input").addClass("project-title").text(newAttr[attr]);
    } else {
      $("p#description").remove("input").addClass("project-description-text").text(newAttr[attr]);
    }
  },

  upload: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_SETTINGS, function(error, payload) {
      var attrs = {
        url: payload[0].url,
        thumbnail_url: payload[0].thumbnail_url
      };
      new BasecampApp.Models.Upload({ project: this.model }).save(attrs, {
        success: function () {
          this.model.uploads().fetch();
        }.bind(this)
      });
    }.bind(this));
  }
})