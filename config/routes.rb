Rails.application.routes.draw do
  resources :users, except: [:index]
  
  resource :session, only: [:new, :create, :destroy]
end
