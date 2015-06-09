class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false
    end

    add_index :projects, :title
    add_index :projects, :owner_id
  end
end
