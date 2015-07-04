module Api
  class TasksController < ApiController
    def create
      task = Task.new(task_params)
      task.author_id = current_user.id
      task.project_id = params[:project][:id]

      if task.save
        render json: task
      else
        render json: task.errors.full_messages, status: :unprocessable_entity
      end
    end
    
    def destroy
      task = current_user.tasks.find(params[:id])
      task.try(:destroy)
      render json: {}
    end

    def index
      @task = Task.all

      render json: @task
    end

    def update
      task = Task.find(params[:id])

      if task.update(task_params)
        render json: task
      else
        render json: task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @task = Task.find(params[:id])
      @project_title = Project.find(@task.project_id).title
      @owner_name = User.find(@task.author_id).username
      @assignments = @task.assigned_tasks
      @comments = @task.comments
      render "show.json.jbuilder"
    end

    private

    def task_params
      params.require(:task).permit(:title, :body, :status)
    end
  end
end