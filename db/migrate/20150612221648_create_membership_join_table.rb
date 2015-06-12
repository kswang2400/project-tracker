class CreateMembershipJoinTable < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.integer :user_id, null: false
      t.integer :project_id, null: false

      t.timestamps
    end

    add_index :memberships, :user_id
    add_index :memberships, :project_id
  end
end
