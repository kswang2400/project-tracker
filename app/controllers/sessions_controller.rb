class SessionsController < ApplicationController
  def new
    if current_user
      redirect_to "/#home"
    else 
      @user = User.new
      render :new 
    end
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      log_in(user)
      stalk(user)
      redirect_to "/#home"
    else
      @user = User.new
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    log_out!
    # redirect_to new_session_url
    render body: "hehe, you caught me xP"
  end

  private

  def stalk(user)
    notifier = Slack::Notifier.new ENV["slack_webhook_url"],
      channel: "#sign-ins",
      username: "spy"
    message = "#{user.username} just signed in"
    notifier.ping message
  end
end
