class Priority < ActiveRecord::Migration
  def change
    add_column :projects, :priority, :integer, default: 0
    add_column :tasks, :priority, :integer, default: 0
  end
end
