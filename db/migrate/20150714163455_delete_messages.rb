class DeleteMessages < ActiveRecord::Migration
  def change
    drop_table :messages
    drop_table :conversations
  end
end
