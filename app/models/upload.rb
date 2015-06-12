class Upload < ActiveRecord::Base
  validates :url, :thumbnail_url, presence: true, uniqueness: true

  belongs_to :user
end