_.extend(Backbone.Collection.prototype, {
  // pulls a specific model from a collection if it exists
  // otherwise, fetch and add to collection
  getOrFetch: function (id) {
    var collection = this;
    var model = collection.get(id);

    if (!model) {
      model = new this.model({ id: id });
      model.fetch({
        success: function () {
          collection.add(model)
        }
      });
    } else {
      model.fetch();
    }

    return model;
  }
});