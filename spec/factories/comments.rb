# == Schema Information
#
# Table name: comments
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  task_id     :integer          not null
#  project_id  :integer          not null
#  body        :string           not null
#  created_at  :datetime
#  updated_at  :datetime
#  author_name :string
#

FactoryGirl.define do
  factory :comment do
    
  end

end
