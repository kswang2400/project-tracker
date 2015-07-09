json.extract! @project, :id, :title, :owner_id, :description
json.owner_name @project_owner.username
json.uploads @uploads
json.incomplete_tasks @incomplete do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.author User.find(task.author_id).username
  json.project_title @project.title
  json.assignments task.assigned_tasks
end
json.completed_tasks @completed do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.author User.find(task.author_id).username
  json.project_title @project.title
  json.assignments task.assigned_tasks
end
json.memberships @memberships

