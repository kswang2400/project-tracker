# == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  project_id :integer          not null
#  title      :string           not null
#  body       :string
#  created_at :datetime
#  updated_at :datetime
#  status     :string           default("incomplete")
#

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
