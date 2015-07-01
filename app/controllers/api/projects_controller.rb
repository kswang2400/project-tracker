module Api
  class ProjectsController < ApiController
    def create
      project = Project.new(project_params)
      project.owner_id = current_user.id

      if project.save
        seed_new_project(project)
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
      if params[:tagged]
        @projects = current_user.tagged_projects
      else 
        @projects = current_user.projects
      end

      # respond_to do |format|
      #   format.json { render "index.json.jbuilder" } 
      #   format.pdf { render "basic.pdf.prawn" }
      # end

      render "index.json.jbuilder"
    end

    def show
      project_id = params[:id]
      @project = Project.find(project_id)
      @project_owner = User.find(@project.owner_id)
      @uploads = Upload.where(project_id: project_id)
      @tasks = Task.where(project_id: project_id)
      @memberships = Membership.where(project_id: project_id)

      render "show.json.jbuilder"
    end

    def update
      project = Project.find(params[:id])
      
      if project.update(project_params)
        render json: project
      else
        render json: project.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def project_params
      params.require(:project).permit(:title, :description)
    end
  end
end