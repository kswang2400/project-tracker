class DeletePpColumns < ActiveRecord::Migration
  def change
    remove_column :assigned_tasks, :profile_picture
    remove_column :memberships, :profile_picture
  end
end
