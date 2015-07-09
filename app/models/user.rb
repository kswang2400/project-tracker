# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#  bio             :string
#  email           :string
#  profile_picture :string
#  activated       :boolean          default(FALSE)
#  premium         :boolean          default(FALSE)
#  admin           :boolean          default(FALSE)
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  VALID_USERNAME_REGEX = /\A[a-zA-Z0-9\_]+\z/
  validates :username,  uniqueness: true, 
                        length: { maximum: 28 },
                        format: { with: VALID_USERNAME_REGEX }


  has_many :projects, foreign_key: :owner_id, dependent: :destroy
  has_many :tasks, foreign_key: :author_id

  has_many :memberships, dependent: :destroy
  has_many :tagged_projects, through: :memberships, source: :project

  has_many :assigned_tasks, dependent: :destroy
  has_many :tasks_assigned, through: :assigned_tasks, source: :task

  has_many :uploads
    
  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    return nil unless user && user.is_password?(password)
    user
  end

  def self.github_repos(user)
    repos = []
    github_username = user.username

    # 403 API rate limit exceeded for 199.241.200.248. 
    # (But here's the good news: Authenticated requests get a higher rate limit. 
    #   Check out the documentation for more details.)  


    Github.new.repos.list user: github_username do |repo|
      repos.push(repo.name)
    end

    repos
  end

  def customer_support(question)
    new_ticket = Slack::Notifier.new ENV['slack_webhook_url'],
      channel: "#customer-support",
      username: self.username
    message = "#{self.username}  asks  #{question}"
    new_ticket.ping message
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
