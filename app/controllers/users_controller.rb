class UsersController < ApplicationController
  def show
    @user = User.find_by(session_token: session[:session_token])
    render :show
  end

  def new
    @user = User.new
    render :new

  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      redirect_to user_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
