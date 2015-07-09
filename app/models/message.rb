class Message < ActiveRecord::Base
  validates :body, :conversation_id, :user_id, presence: true

  belongs_to :conversation
  belongs_to :user
end
