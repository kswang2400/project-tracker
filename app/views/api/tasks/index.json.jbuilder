json.array! @tasks do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.project_title task.project.title
end