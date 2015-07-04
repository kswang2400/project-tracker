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

FactoryGirl.define do
  factory :user do
    username "test"
    password "password"
  end
end
