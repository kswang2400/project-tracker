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

FactoryGirl.define do
  factory :project do
    
  end

end
