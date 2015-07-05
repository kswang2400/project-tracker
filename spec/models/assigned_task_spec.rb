# == Schema Information
#
# Table name: assigned_tasks
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  task_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

require 'rails_helper'

RSpec.describe AssignedTask, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:task) }
end
