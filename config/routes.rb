Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :projects do
      resources :memberships
      resources :uploads
    end
  end

  resource :session, only: [:new, :create, :destroy]
  resources :users
end
