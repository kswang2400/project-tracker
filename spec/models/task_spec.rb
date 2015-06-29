require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "associations" do
    it { should belong_to(:author) }
    it { should belong_to(:project) }
    it { should have_many(:assigned_tasks) }
    it { should have_many(:assigned_users) }
    it { should have_many(:comments) }
  end
end
