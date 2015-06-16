json.extract! @task, :author_id, :project_id, :title, :body, :status
json.assigned_users @assigned_users, :id, :username