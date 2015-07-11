class AddUserNameComments < ActiveRecord::Migration
  def change
    add_column :comments, :author_name, :string, presence: true
  end
end
