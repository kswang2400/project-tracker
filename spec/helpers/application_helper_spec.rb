
require "rails_helper"

RSpec.describe ApplicationHelper, type: :module do
  include ApplicationHelper

  subject { User.create(username: "test", password: "password") }

  describe "#seed_new_user" do
    it "should take in a User object as an argument" do
      expect { seed_new_user(subject) }.to_not raise_error
    end

    it "creates a project for user" do
      seed_new_user(subject)
      expect(subject.projects.length).to eq 1
    end

    it "should associate project with correct user" do
      seed_new_user(subject)
      expect(subject.projects.first.owner_id).to eq subject.id
    end

    it "returns nil" do
      expect(seed_new_user(subject)).to be nil
    end
  end


  describe "#seed_new_project" do
    before :each do 
      @user = User.create(username: "test", password: "password")
      @project = Project.create(title: "test project", description: "test description", owner_id: @user.id)
    end

    it "should take in a Project object as well as a User object" do
      expect { seed_new_project(@project, @user) }.to_not raise_error
    end

    context "object creation" do
      before :each do
        seed_new_project(@project, @user)
      end

      it "should create three membership items for project" do
        expect(@project.memberships.length).to eq 3
      end

      it "should create four tasks through all three memberships" do
        expect(@project.tasks.length).to eq 4
      end
    end
  end
end