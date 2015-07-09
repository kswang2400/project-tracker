json.array! @tasks do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.project_title task.project.title
  json.owner_name task.author
  json.assignments task.assigned_tasks
  json.comments task.comments
end