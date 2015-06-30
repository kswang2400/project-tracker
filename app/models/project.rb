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
  validates :title, :owner_id, :description, presence: true

  belongs_to :owner, class_name: :User
  
  has_many :uploads, foreign_key: :project_id, dependent: :destroy
  has_many :memberships
  has_many :members, through: :memberships, source: :user
  has_many :tasks, dependent: :destroy
  has_many :assignments, through: :tasks, source: :assigned_users
end
