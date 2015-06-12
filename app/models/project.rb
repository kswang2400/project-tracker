# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  owner_id    :integer          not null
#  description :string
#

class Project < ActiveRecord::Base
  validates :title, :owner_id, presence: true

  belongs_to :owner, class_name: :User
  has_many :uploads, class_name: :Upload, foreign_key: :project_id, dependent: :destroy
end
