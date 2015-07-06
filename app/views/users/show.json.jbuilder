json.extract!(@user, :id, :username, :projects, :bio, :email, :profile_picture)
json.tasks @tasks do |task|
  json.extract! task, :id, :author_id, :project_id, :title, :body, :status
  json.project_title task.project.title
  json.author task.author.username
end