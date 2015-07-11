describe("User", function () {
  it("should have a default projects function", function () {
    var user = BascampApp.Models.User();
    expect(user).toBeDefined();
  });
});