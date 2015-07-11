class MembershipProfilePicture < ActiveRecord::Migration
  def change
    add_column :memberships, :profile_picture, :string, presence: true
  end
end
