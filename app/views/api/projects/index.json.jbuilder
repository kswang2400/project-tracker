json.array! @projects do |project|
  json.extract! project, :id, :title, :owner_id, :description
  json.num_tasks project.tasks.length
end
