class UsersController < ApplicationController
  def create
    params["user"]["profile_picture"] ||= ENV["default_picture"]
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      seed_new_user(@user)
      slack_notify_new(@user)
      redirect_to "/#home"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def customer_support
    question = params["question"]
    current_user.customer_support(question)
    render json: {}
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
    @tasks_assigned = @user.tasks_assigned
    @tasks = @tasks_assigned.where(status: "incomplete")
    @completed = @tasks_assigned.where(status: "completed")
    @repos = User.github_repos(@user) || []
    
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

  def slack_notify_new(user)
    notifier = Slack::Notifier.new ENV['slack_webhook_url'], 
      channel: "#notifier", 
      username: "welcome ghost"
    message = "#{user.username} has just joined Project Tracker"
    notifier.ping message, icon_emoji: ":ghost:"
  end

  def user_params
    params.require(:user).permit(
      :username, 
      :password, 
      :bio, 
      :email, 
      :profile_picture
    )
  end
end
