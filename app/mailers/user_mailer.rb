class UserMailer < ApplicationMailer
  default from: "no-reply@projecttracker.biz"

  def welcome_email(user)
    @user = user
    @url = "http://www.projecttracker.biz/session/new"

    mail(to: @user.email, subject: "Welcome to Project Tracker")
  end

  def new_account(user)
    @user = user

    mail(to: "kevinwang2400@gmail.com", subject: "New User Sign Up")
  end

  def question_submitted(user)

  end
end
