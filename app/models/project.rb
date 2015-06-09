class Project < ActiveRecord::Base
  validates :title, :owner_id, presence: true

  belongs_to :owner, class_name: :user
end