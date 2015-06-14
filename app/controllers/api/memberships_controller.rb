module Api
  class MembershipsController < ApiController
    def create
      membership = Membership.new(membership_params)
      membership.project_id = params[:project_id]

      if membership.save
        render json: membership
      else
        render json: membership.errors.fullmessages, status: :unprocessable_entity
      end
    end

    def index 
      @uploads = Membership.all.where(project_id: params[:project_id])
      render json: @uploads
    end

    private

    def membership_params
      params.require(:membership).permit(:user_id)
    end
  end
end