module Api
  class ProjectsController < ApplicationController
    def create
    end

    def destroy
    end

    def index
      @projects = (logged_in?) ? current_user.projects : Project.all
      render json: @projects
    end

  end
end