# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150612221648) do

  create_table "memberships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "project_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "memberships", ["project_id"], name: "index_memberships_on_project_id"
  add_index "memberships", ["user_id"], name: "index_memberships_on_user_id"

  create_table "projects", force: :cascade do |t|
    t.string  "title",       null: false
    t.integer "owner_id",    null: false
    t.string  "description"
  end

  add_index "projects", ["owner_id"], name: "index_projects_on_owner_id"
  add_index "projects", ["title"], name: "index_projects_on_title"

  create_table "uploads", force: :cascade do |t|
    t.string   "url",           null: false
    t.string   "thumbnail_url", null: false
    t.integer  "user_id",       null: false
    t.integer  "project_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "uploads", ["project_id"], name: "index_uploads_on_project_id"
  add_index "uploads", ["thumbnail_url"], name: "index_uploads_on_thumbnail_url", unique: true
  add_index "uploads", ["url"], name: "index_uploads_on_url", unique: true
  add_index "uploads", ["user_id"], name: "index_uploads_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
