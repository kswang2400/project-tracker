module Api
  class TasksController < ApiController
    def create
      assigned_task = AssignedTask.new(assigned_task_params)

      if assigned_task.save
        render json: assigned_task
      else
        render json: assigned_task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index 
      @assigned_tasks = AssignedTask.all.where(user_id: current_user.id)
      render json: @assigned_tasks
    end

    def destroy
      assigned_task = AssignedTask.find(params[:id])
      assigned_task.destroy
      render json: {}
    end
    private

    def assigned_task_params
      params.require(:assigned_task).permit(:user_id, :task_id)
    end
  end
end
