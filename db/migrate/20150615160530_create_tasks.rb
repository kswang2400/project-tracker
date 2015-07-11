class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :author_id, null: false
      t.integer :project_id, null: false
      t.string :title, null: false
      t.string :body

      t.timestamps
    end

    add_index :tasks, :author_id
    add_index :tasks, :project_id
  end
end
