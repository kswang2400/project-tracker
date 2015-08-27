class AddTaskColumnUploads < ActiveRecord::Migration
  def change
    add_column :uploads, :task_id, :integer, null: false
  end
end
