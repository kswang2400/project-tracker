# == Schema Information
#
# Table name: assigned_tasks
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  task_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class AssignedTask < ActiveRecord::Base
  validates :user_id, :task_id, presence: true

  belongs_to :user
  belongs_to :task
end
