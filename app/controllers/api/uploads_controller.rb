module Api
  class UploadsController < ApiController
    def create
      upload = Upload.new(upload_params)
      upload.user_id = current_user.id
      upload.project_id = params[:project_id]

      if upload.save
        render json: upload
      else
        render json: upload.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      upload = current_user.uploads.find(params[:id])
      upload.try(:destroy)
      render json: {}
    end

    def index
      @uploads = Upload.all.where(project_id: params[:project_id])
      render json: @uploads
    end

    def show
      upload = Upload.find(params[:id])
      render json: upload
    end

    private

    def upload_params
      params.require(:upload).permit(:url, :thumbnail_url)
    end
  end
end