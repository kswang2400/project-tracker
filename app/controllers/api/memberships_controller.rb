module Api
  class MembershipsController < ApiController
    def index 
      @uploads = Membership.all.where(project_id: params[:project_id])
      render json: @uploads
    end
  end
end