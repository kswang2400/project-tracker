Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, except: [:index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :projects do
      resources :uploads
    end
  end
end
