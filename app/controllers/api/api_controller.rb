
module Api
  class ApiController < ApplicationController
    before_action :require_signed_in!

    def require_signed_in!
      unless logged_in?
        render json: ["You must be signed in to perform that action!"], status: :unauthorized
      end
    end

    def confirm_authorization(user_id)
      unless current_user.id == user_id
        render json: ["You do not have access to that action!"], status: :unauthorized
        return false
      end
    end
  end
end