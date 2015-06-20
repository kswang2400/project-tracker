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

class Task < ActiveRecord::Base
  validates :author_id, :project_id, :title, presence: true

  belongs_to :author, class_name: :User
  belongs_to :project

  has_many :assigned_tasks
  has_many :assigned_users, through: :assigned_tasks, source: :user
end
