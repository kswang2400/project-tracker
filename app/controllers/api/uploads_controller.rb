module Api
  class UploadsController < ApiController
    def create
      upload = Upload.new(upload_params)
      upload.user_id = current_user.id

      if upload.save
        render json: upload
      else
        render json: upload.errors.fullmessages, status: :unprocessable_entity
      end
    end

    def destroy
      upload = current_user.uploads.find(params[:id])
      upload.try(:destroy)
      render json: {}
    end

    def index
      @uploads = current_user.uploads
      render json: @uploads
    end

    def show
      upload = Upload.find(params[:id])
      render json: upload
    end

    def update
      upload = Upload.find(params[:id])
      
      if upload.update(upload_params)
        render json: upload
      else
        render json: upload.errors.fullmessages, status: :unprocessable_entity
      end
    end

    private

    def upload_params
      params.require(:upload).permit(:url, :thumbnail_url)
    end
  end
end