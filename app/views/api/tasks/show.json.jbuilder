json.extract! @task, :id, :author_id, :project_id, :title, :body, :status
json.owner_name @owner_name
json.project_title @project_title
json.assignments @assignments do |assignment|
  json.extract! assignment, :id, :user_id, :task_id
  json.user_pic User.find(assignment.user_id).profile_picture
end
json.comments @comments

