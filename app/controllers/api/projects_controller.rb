module Api
  class ProjectsController < ApiController
    def create
      project = Project.new(project_params)
      project.owner_id = current_user.id

      if project.save
        Membership.create!(user_id: 1, project_id: project.id)
        Membership.create!(user_id: 2, project_id: project.id)
        Membership.create!(user_id: 3, project_id: project.id)

        task = Task.create!(
          author_id: 1,
          project_id: project.id,
          title: "First Task!",
          body: "Hello! We're here to get you started! Drag any membership to any task to create an assignment!"
        )

        AssignedTask.create!(
          user_id: 1,
          task_id: task.id
        )

        AssignedTask.create!(
          user_id: 2,
          task_id: task.id
        )

        AssignedTask.create!(
          user_id: 3,
          task_id: task.id
        )

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