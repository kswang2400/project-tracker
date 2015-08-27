Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, view) {
    // add new subview to array of subviews under specific selector
    // attach subview to DOM
    this.subviews(selector).push(view);
    this.attachSubview(selector, view.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents(); // binds event listeners in case $el has been previously removed

    if (subview.attachSubviews) { // recursively attach all subviews, if necessary
      subview.attachSubviews();
    }
  },

  attachSubviews: function () { // check if any children are also subviews
    var view = this;

    _(this.subviews()).each(function (selectorSubviews, selector) {
      view.$(selector).empty();
      _(selectorSubviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  emptySubviews: function (selector) {
    this.subviews(selector).forEach(function (subview) {
      subview.remove();
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this); // calls original remove method
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { // remove any children subviews
        subview.remove();
      });
    });
  },

  removeModelSubview: function (selector, model) {
    var selectorSubviews = this.subviews(selector);

    // var i = selectorSubviews.indexOf(function (subview) {
    //   return subview.model === model;
    // });
    
    // if (i === -1) { return; }

    for (var i = 0; i < selectorSubviews.length; i++) {
      if (selectorSubviews[i].model == model) {
        var j = i
      };
    };
    
    if (j === undefined) { return; }

    selectorSubviews[j].remove();
    selectorSubviews.splice(j, 1);
  },

  removeSubview: function (selector, subview) {
    // remove actual view
    subview.remove();

    // remove subview from CompositeView object so future renders don't reproduce the deleted view
    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // lazy initializing _subviews
    this._subviews = this._subviews || {};

    if (selector) {
      // return array of subviews under specific selector
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    } else {
      // return entire subviews object
      return this._subviews;
    }
  }
});