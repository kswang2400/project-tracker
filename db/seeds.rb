# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username: "kevin_wang", password: "password")
User.create!(username: "jimothy_smith", password: "password")
User.create!(username: "jolene_anderson", password: "password")
User.create!(username: "guest", password: "password")

# 20.times { User.create!(username: Faker::Internet.user_name, password: "password")}

# 50.times do |i|
#   Project.create!(
#     owner_id: (i % 23 ) + 1, 
#     title: Faker::Lorem.words(2), 
#     description: Faker::Lorem.paragraph)
# end

# 100.times do |i|
#   Task.create!(
#     author_id: (i % 23) + 1, 
#     project_id: (i % 50) + 1, 
#     title: Faker:: Lorem.words(1), 
#     body: Faker::Lorem.sentence)
# end