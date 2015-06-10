module Api
  class ProjectsController < ApplicationController
    def create
      project = Project.new(projects_params)

      if project.save
        render json: project
      else
        render json: project.errors.fullmessages, status: :unprocessable_entity
      end
    end

    def destroy
      project = current_user.projects.find(params[:id])
      project.try(:destroy)
      render json: {}
    end

    def index
      @projects = (logged_in?) ? current_user.projects : Project.all
      render json: @projects
    end

    def show
      project = Project.find(params[:id])
      # .includes(:title, :description).
      # implement privacy later
      render json: project
    end

    private

    def project_params
      params.require(:project).permit(:title, :description)
    end
  end
end