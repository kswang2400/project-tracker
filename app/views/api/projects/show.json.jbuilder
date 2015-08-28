json.extract! @project, :id, :title, :owner_id, :description
json.owner_name @project_owner.username
json.uploads @uploads

json.tasks @tasks do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.author User.find(task.author_id).username
  json.project_title @project.title
  json.assignments task.assigned_tasks do |assignment|
    json.extract! assignment, :id, :user_id, :task_id
    json.user_pic User.find(assignment.user_id).profile_picture
  end
end

json.memberships @memberships do |membership|
  user = User.find(membership.user_id)
  json.extract! membership, :id, :user_id, :project_id
  json.user_pic user.profile_picture
  json.username user.username
end
