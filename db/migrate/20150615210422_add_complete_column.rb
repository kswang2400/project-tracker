class AddCompleteColumn < ActiveRecord::Migration
  def change
    add_column :tasks, :status, :string, default: :incomplete
  end
end
