module Api
  class CommentsController < ApiController
    def create
      comment = Comment.new(comment_params)
      comment.author_id = current_user.id
      comment.task_id = params[:task_id]
      comment.project_id = Project.find(Task.find(params[:task_id]).project_id)

      if comment.save
        render json: comment
      else
        render json: comment.errors.fullmessages, status: :unprocessable_entity
      end
    end

    def index 
      @comments = Comment.all.where(project_id: params[:project_id])
      render json: @comments
    end

    def destroy
      comment = Comment.find(params[:id])
      comment.destroy
      render json: {}
    end

    private

    def comment_params
      params.require(:comment).permit(:body)
    end
  end
end