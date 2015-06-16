json.extract! @project, :id, :title, :owner_id, :description
json.owner_name @project_owner.username
json.uploads @uploads
json.tasks @tasks do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.assigned_users task.assigned_users
end
json.memberships @memberships


