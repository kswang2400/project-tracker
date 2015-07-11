# == Schema Information
#
# Table name: uploads
#
#  id            :integer          not null, primary key
#  url           :string           not null
#  thumbnail_url :string           not null
#  user_id       :integer          not null
#  project_id    :integer          not null
#  created_at    :datetime
#  updated_at    :datetime
#

require 'rails_helper'

RSpec.describe Upload, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:project) }
  end
end
