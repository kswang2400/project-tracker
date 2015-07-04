class UsersController < ApplicationController
  def create
    params["user"]["profile_picture"] ||= "http://res.cloudinary.com/du0durr8z/image/upload/v1435800470/professional-corgi_b7uiec.jpg"
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      seed_new_user(@user)
      @user.slack_notify
      redirect_to "/#home"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def index
    if params[:query]
      @users = User.where("LOWER(username) ~ ?",params[:query]).limit(6)
    else
      @users = User.all
    end

    render json: @users
  end
  
  def new
    @user = User.new
    render :new
  end

  def show
    @user = User.find(params[:id])
    @tasks = @user.tasks_assigned
    render "show.json.jbuilder"
  end

  def destroy
    user = User.find(params[:id])
    user.try(:destroy)
    render json: {}
  end 

  def update 
    user = User.find(params[:id])
    
    if user.update(user_params)
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :password, :bio, :email, :profile_picture)
  end
end
