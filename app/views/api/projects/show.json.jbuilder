json.extract! @project, :id, :title, :owner_id, :description
json.owner_name @project_owner.username
json.uploads @uploads
json.tasks @tasks do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.assignments task.assigned_tasks
end
json.incomplete_tasks @tasks.select { |t| t.status != "completed" }
json.completed_tasks @tasks.select { |t| t.status == "completed" }
json.memberships @memberships


