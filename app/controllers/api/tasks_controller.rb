module Api
  class TasksController < ApiController
    def create
      task = Task.new(task_params)
      task.author_id = current_user.id
      task.project_id = params[:project_id]

      if task.save
        render json: task
      else
        render json: task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index 
      @tasks = Task.all.where(project_id: params[:project_id])
      render json: @tasks
    end

    def destroy
      task = current_user.tasks.find(params[:id])
      task.try(:destroy)
      render json: {}
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
      @assignments = @task.assigned_tasks
      render "show.json.jbuilder"
    end

    private

    def task_params
      params.require(:task).permit(:title, :body, :status)
    end
  end
end