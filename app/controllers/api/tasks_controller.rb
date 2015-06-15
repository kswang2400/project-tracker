module Api
  class TasksController < ApiController
    def create
      task = Task.new(task_params)
      task.author_id = current_user.id
      task.project_id = params[:project_id]

      if task.save
        render json: task
      else
        render json: task.errors.fullmessages, status: :unprocessable_entity
      end
    end

    def index 
      @tasks = Task.all.where(project_id: params[:project_id])
      render json: @tasks
    end

    private

    def task_params
      params.require(:task).permit(:title, :body)
    end
  end
end