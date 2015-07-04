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

class Comment < ActiveRecord::Base
  validates :author_id, :task_id, :project_id, :body, presence: true
  validates :body, length: { maximum: 40 }

  belongs_to :author, class_name: :User
  belongs_to :project
  belongs_to :task
end
