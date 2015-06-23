json.extract!(@user, :id, :username, :projects, :bio, :email)
json.tasks @tasks