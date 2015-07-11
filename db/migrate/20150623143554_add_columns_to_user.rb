class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :bio, :string
    add_column :users, :email, :string
    add_column :users, :profile_picture, :string
    add_column :users, :activated, :boolean, default: :false
    add_column :users, :premium, :boolean, default: :false
    add_column :users, :admin, :boolean, default: :false
  end
end
