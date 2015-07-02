json.extract!(@user, :id, :username, :projects, :bio, :email, :profile_picture)
json.tasks @tasks