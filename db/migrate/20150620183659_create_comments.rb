class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :task_id, null: false
      t.integer :project_id, null: false
      t.string :body, null: false

      t.timestamps
    end

    add_index :comments, :author_id
    add_index :comments, :task_id
    add_index :comments, :project_id
  end
end
