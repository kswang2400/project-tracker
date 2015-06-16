Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :projects do
      resources :memberships, only: [:create, :index, :destroy]
      resources :uploads, except: [:new, :edit, :update]
      resources :tasks
    end
    
    resources :assigned_tasks
    # TODO: remove nesting (except maybe `create` routes)
  end

  resource :session, only: [:new, :create, :destroy]
  resources :users
end
