# == Schema Information
#
# Table name: memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  project_id :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

FactoryGirl.define do
  factory :membership do
    
  end

end
