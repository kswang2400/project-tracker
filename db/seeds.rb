# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username: "example1", password: "password")
User.create!(username: "example2", password: "password")
User.create!(username: "example3", password: "password")

Project.create!(owner_id: 1, title: "Project 1", 
  description: "This is my first project! I'm using it to test things out")
Project.create!(owner_id: 1, title: "Project 2",
  description: "For my second project, I'm going to finish projects CRUD by 
  the end of the day")
Project.create!(owner_id: 1, title: "Project 3",
  description: "This is my latest project. I don't even know what I'm going to 
  do yet. Come back soon to see if I started anything new.")
Project.create!(owner_id: 2, title: "New Project",
  description: "I created a new project.")
Project.create!(owner_id: 3, title: "Old Project",
  description: "This project was completed years ago!")

20.times { User.create!(username: Faker::Internet.user_name, password: "password")}

50.times do |i|
  Project.create!(
    owner_id: (i % 23 ) + 1, 
    title: Faker::Lorem.words(2), 
    description: Faker::Lorem.paragraph)
end

100.times do |i|
  Task.create!(
    author_id: (i % 23) + 1, 
    project_id: (i % 50) + 1, 
    title: Faker:: Lorem.words(1), 
    body: Faker::Lorem.sentence)
end