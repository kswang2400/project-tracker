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

class Upload < ActiveRecord::Base
  validates :url, :thumbnail_url, :user_id, :project_id, presence: true
  validates :url, :thumbnail_url, uniqueness: true

  belongs_to :user
  belongs_to :project
end
