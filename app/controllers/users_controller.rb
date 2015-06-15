class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    # render json: @username
    render "show.json.jbuilder"
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      redirect_to "/#home"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def index
    if params[:query]
      @users = User.where("username LIKE \"%#{params[:query]}%\"").limit(10)
    else
      @users = User.all
    end

    render json: @users
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
