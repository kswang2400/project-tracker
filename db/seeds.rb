# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

include ApplicationHelper

User.create(username: "kevin_wang", 
  password: "password123", 
  profile_picture: ENV["kevin_picture"])
User.create(username: "jimothy_smith", 
  password: "password123", 
  profile_picture: ENV["jimothy_picture"])
User.create(username: "jolene_anderson", 
  password: "password123", 
  profile_picture: ENV["jolene_picture"])
User.create(username: "kush_ruggeri", 
  password: "password123", 
  profile_picture: ENV["kush_picture"])
User.create(username: "guest_user", 
  password: "password", 
  profile_picture: ENV["default_picture"])

User.all.each do |user|
  seed_new_user(user)
end