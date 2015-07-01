module Api
  class CommentsController < ApiController
    def create
      comment = Comment.new(comment_params)
      comment.author_id = current_user.id
      comment.author_name = current_username

      if comment.save
        render json: comment
      else
        render json: comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      comment = Comment.find(params[:id])
      comment.destroy
      render json: {}
    end

    def index 
      @comments = Comment.all
      # .where(project_id: params[:project_id])
      render json: @comments
    end

    def show
      @comment = Comment.find(params[:id])
      render json: @comment
    end

    private

    def comment_params
      params.require(:comment).permit(:body, :task_id, :project_id)
    end
  end
end