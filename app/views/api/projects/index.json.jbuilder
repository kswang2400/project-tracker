json.array! @projects do |project|
  json.extract! project, :id, :title, :owner_id, :description
  json.owner_name project.owner.username
  json.num_tasks project.tasks.length
  json.num_complete project.tasks.all.select { |m| m.status == "completed" }.length
  json.num_members project.members.length
  json.num_uploads project.uploads.length
  json.num_assignments project.assignments.length
end
