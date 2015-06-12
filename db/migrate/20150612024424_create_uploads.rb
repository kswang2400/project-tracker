class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :url, null: false
      t.string :thumbnail_url, null: false
      t.integer :user_id, null: false
      t.integer :project_id, null: false

      t.timestamps
    end

    add_index :uploads, :url, unique: true
    add_index :uploads, :thumbnail_url, unique: true
    add_index :uploads, :user_id
    add_index :uploads, :project_id
  end
end
