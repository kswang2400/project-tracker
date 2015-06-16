json.extract! @project, :id, :title, :owner_id, :description
json.owner_name @project_owner.username
json.uploads @uploads
json.tasks @tasks
json.memberships @memberships


