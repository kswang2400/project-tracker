json.extract! @project, :id, :title, :owner_id, :description
json.owner_name @project_owner.username
json.uploads @uploads

<<<<<<< HEAD
json.high @high_priority
json.low @low_priority

json.incomplete_tasks @incomplete do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.author User.find(task.author_id).username
  json.project_title @project.title
  json.assignments task.assigned_tasks do |assignment|
    json.extract! assignment, :id, :user_id, :task_id
    json.user_pic User.find(assignment.user_id).profile_picture
  end
  json.priority task.priority
end

json.completed_tasks @completed do |task|
=======
json.tasks @tasks do |task|
>>>>>>> 15001c2f12d60f7645fed627f9c96341456b5d83
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.author User.find(task.author_id).username
  json.project_title @project.title
  json.assignments task.assigned_tasks do |assignment|
    json.extract! assignment, :id, :user_id, :task_id
    json.user_pic User.find(assignment.user_id).profile_picture
  end
  json.priority task.priority
end

json.memberships @memberships do |membership|
  user = User.find(membership.user_id)
  json.extract! membership, :id, :user_id, :project_id
  json.user_pic user.profile_picture
  json.username user.username
end
