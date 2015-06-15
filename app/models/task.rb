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
#

class Task < ActiveRecord::Base
  validates :author_id, :project_id, :title, presence: true

  belongs_to :author, class_name: :User
  belongs_to :project
end
