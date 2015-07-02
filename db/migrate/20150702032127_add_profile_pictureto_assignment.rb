class AddProfilePicturetoAssignment < ActiveRecord::Migration
  def change
    add_column :assigned_tasks, :profile_picture, :string, presence: true
  end
end
