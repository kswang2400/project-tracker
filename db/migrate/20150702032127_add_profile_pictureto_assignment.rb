class AddProfilePicturetoAssignment < ActiveRecord::Migration
  def change
    add_column :assigned_tasks, :profile_picture, :string, default: "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/professional-corgi_b7uiec.jpg"
  end
end
