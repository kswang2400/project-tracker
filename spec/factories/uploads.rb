# == Schema Information
#
# Table name: uploads
#
#  id            :integer          not null, primary key
#  url           :string           not null
#  thumbnail_url :string           not null
#  user_id       :integer          not null
#  project_id    :integer          not null
#  created_at    :datetime
#  updated_at    :datetime
#

FactoryGirl.define do
  factory :upload do
    
  end

end
