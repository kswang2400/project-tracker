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

class Membership < ActiveRecord::Base
  validates :user_id, :project_id, presence: true

  belongs_to :user
  belongs_to :project
end
