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
#  priority   :integer          default(0)
#

FactoryGirl.define do
  factory :task do
    
  end

end
