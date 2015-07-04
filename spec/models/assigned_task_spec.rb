# == Schema Information
#
# Table name: assigned_tasks
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  task_id         :integer          not null
#  created_at      :datetime
#  updated_at      :datetime
#  profile_picture :string           default("http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/professional-corgi_b7uiec.jpg")
#

require 'rails_helper'

RSpec.describe AssignedTask, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:task) }
end
