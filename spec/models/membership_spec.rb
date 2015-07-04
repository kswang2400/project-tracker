# == Schema Information
#
# Table name: memberships
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  project_id      :integer          not null
#  created_at      :datetime
#  updated_at      :datetime
#  profile_picture :string
#

require 'rails_helper'

RSpec.describe Membership, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:project) }
  end
end
