class CreateAssignedTask < ActiveRecord::Migration
  def change
    create_table :assigned_tasks do |t|
      t.integer :user_id, null: false
      t.integer :task_id, null: false

      t.timestamps
    end

    add_index :assigned_tasks, :user_id
    add_index :assigned_tasks, :task_id
    add_index :assigned_tasks, [:user_id, :task_id], unique: true 
  end
end
