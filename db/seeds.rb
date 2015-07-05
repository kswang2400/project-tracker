# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "kevin_wang", 
  password: "password123", 
  profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435799495/sxsn38m5qgbrsjleorz6.png")
User.create(username: "jimothy_smith", 
  password: "password123", 
  profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof1_qiylm8.png")
User.create(username: "jolene_anderson", 
  password: "password123", 
  profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof3_nkspjg.png")
User.create(username: "kush_ruggeri", 
  password: "password123", 
  profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800655/kush_k7fzhv.jpg")
User.create(username: "guest_user", 
  password: "password", 
  profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/professional-corgi_b7uiec.jpg")

# User.all.each do |user|
#   seed_new_user(user)
# end