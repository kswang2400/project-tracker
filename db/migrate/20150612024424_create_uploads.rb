class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :url, null: false
      t.string :thumbnail_url, null: false

      t.timestamps
    end

    add_index :uploads, :url, unique: true
    add_index :uploads, :thumbnail_url, unique: true
  end
end
