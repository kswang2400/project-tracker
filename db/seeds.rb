# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def seed_new_user(user)
  # WAT Owner can't be blank?!

  # project = Project.create!(
  #   owner_id: user.id, 
  #   title: "Demo Project!", 
  #   description: "This is your demo project! Click here for more info."
  # )
  # seed_new_project(project, user)
end

def seed_new_project(project, user)
  Membership.create!(user_id: 1, project_id: project.id, profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435799495/sxsn38m5qgbrsjleorz6.png")
  Membership.create!(user_id: 2, project_id: project.id, profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof1_qiylm8.png")
  Membership.create!(user_id: 3, project_id: project.id, profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof3_nkspjg.png")

  task1 = Task.create!(
    author_id: user.id,
    project_id: project.id,
    title: "First Task!",
    body: "Hello! We're here to get you started! Drag anyone to any task to create an assignment!"
  )

  task2 = Task.create!(
    author_id: user.id,
    project_id: project.id,
    title: "Second Task!",
    body: "If they're not doing a good job, drag them to the X to remove them from task"
  )

  task3 = Task.create!(
    author_id: user.id,
    project_id: project.id,
    title: "Last Task!",
    body: "If they REALLY suck, kick them out of the project. Drag them from the bar to the X to remove them from the project"
  )

  task4 = Task.create!(
    author_id: user.id,
    project_id: project.id,
    title: "Create Task!",
    body: "Great job! Now mark this complete and watch your incomplete tasks get shorter!"
  )

  AssignedTask.create!(
    user_id: 1,
    task_id: task1.id,
    profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435799495/sxsn38m5qgbrsjleorz6.png" 
  )

  AssignedTask.create!(
    user_id: 3,
    task_id: task1.id,
    profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof3_nkspjg.png"
  )

  AssignedTask.create!(
    user_id: 2,
    task_id: task2.id,
    profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof1_qiylm8.png"
  )

  AssignedTask.create!(
    user_id: 1,
    task_id: task3.id,
    profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435799495/sxsn38m5qgbrsjleorz6.png"
  )

  AssignedTask.create!(
    user_id: user.id,
    task_id: task4.id
  )
end

seed_new_user(User.create(username: "kevin_wang", password: "password123", profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435799495/sxsn38m5qgbrsjleorz6.png"))
seed_new_user(User.create(username: "jimothy_smith", password: "password123", profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof1_qiylm8.png"))
seed_new_user(User.create(username: "jolene_anderson", password: "password123", profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/prof3_nkspjg.png"))
seed_new_user(User.create(username: "kush_ruggeri", password: "password123", profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800655/kush_k7fzhv.jpg"))
seed_new_user(User.create(username: "guest_user", password: "password", profile_picture: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/professional-corgi_b7uiec.jpg"))

# 20.times do 
#   seed_new_user(User.create(username: Faker::Internet.user_name, password: "password123"))
# end





