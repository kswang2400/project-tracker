require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { should belong_to(:author) }
  it { should belong_to(:project) }
  it { should belong_to(:task) }
end
