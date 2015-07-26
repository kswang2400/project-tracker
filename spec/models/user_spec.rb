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

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { User.create(username: "rspec-user", password: "password") }

  describe ".find_by_credentials" do
    it "searches for user by username and password" do
      user = User.create(username: "test2", password: "password")
      query = User.find_by_credentials("test2", "password")
      expect(query.username).to eq user.username
      expect(query.is_password?("password")).to be true
    end
  end

  # this spec doesn't play nice with Travis CI
  # describe "#customer_support" do
  #   it "returns the message" do
  #     expect(subject.customer_support("rspec-question")).to eq "rspec-user  asks  rspec-question"
  #   end
  # end

  describe "password to password_digest" do
    it "creates a valid password digest and doesn't store password" do
      expect(subject.password_digest).not_to eq "password"
    end

    it "can match stored passwords" do
      expect(subject.is_password?("password")).to be true
      expect(subject.is_password?("notPassword")).to be false
    end
  end

  describe "#reset_session_token!" do
    # original subject collides in database; create separate user to 
    # test reset_session_token (Validation failed: Username has already been taken)
    subject { User.create(username: "test3", password: "password")}

    it "creates new session token and saves" do 
      old_session_token = subject.session_token
      subject.reset_session_token!
      expect(subject.session_token).not_to eq old_session_token
    end
  end

  describe "#ensure_session_token" do 
    it "creates new session token on intiailize" do 
      expect(subject.session_token).not_to be_nil
    end

    it "detects presence of session token" do
      subject.session_token = "abcdef"
      subject.send(:ensure_session_token)
      expect(subject.session_token).to eq "abcdef"
    end
  end
end
