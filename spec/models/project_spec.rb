# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  owner_id    :integer          not null
#  description :string
#  priority    :integer          default(0)
#

require 'rails_helper'

RSpec.describe Project, type: :model do
  describe "assocations" do 
    it { should belong_to(:owner) }
    it { should have_many(:uploads) }
    it { should have_many(:memberships) }
    it { should have_many(:members) }
    it { should have_many(:tasks) }
  end
end
