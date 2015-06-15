_.extend(Backbone.Collection.prototype, {
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