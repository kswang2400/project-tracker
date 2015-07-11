# == Schema Information
#
# Table name: comments
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  task_id     :integer          not null
#  project_id  :integer          not null
#  body        :string           not null
#  created_at  :datetime
#  updated_at  :datetime
#  author_name :string
#

require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { should belong_to(:author) }
  it { should belong_to(:project) }
  it { should belong_to(:task) }
end
