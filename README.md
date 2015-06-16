# Basecamp Clone

[Heroku link][heroku]

[heroku]: http://basecamp-clone-kwang.herokuapp.com/

## Minimum Viable Product
Basecamp Clone is a clone of Basecamp built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] CRUD for projects
- [x] Tag other users to projects
- [ ] Subscribe to projects
- [x] Create tasks in projects
- [ ] Create comment threads in tasks
- [x] Upload images in projects

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Project creation (1 days)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create projects using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

### Phase 2: Project CRUD (~2 days)
The primary feature of Basecamp Clone is to interact with projects. I will finish 
the server side CRUD operations for projects. Once my projecs table is setup, I will 
add API routes to serve project data as JSON, then add Backbone models and collections 
that fetch data from those routes. By the end of this phase, users will be able 
to 

+ tag other users to their projects
+ subscribe to projects

### Phase 3: Implementing Tasks (~2 days)
Once the users can create, search, tag and subscribe to projects, I want to add 
tasks to each project so users other than the project author can contribute 
to a project. By the end of this phase, all projects will have a Task feature which
allows anyone involved in the project to create/update a new Task associated with
the project. 

### Phase 4: Implementing Comments (~2 days)
For each task, I will add a section that allows users in the project to discuss 
and leave comments for one another. 

### Phase 5: Uploading Pictures (~1 days)
Once I have a usable project coordination app, I will try to allow users to upload 
pictures. At first, I will have it only be posted to whole projects, but eventually,
have the feature be allowed in tasks and maybe even comments as well. I will have 
to use Amazon Ruby SDK to store images on S3.

### Bonus Features (TBD)
- [ ] Project search
- [ ] User avatars
- [x] Typeahead search bar
- [x] Photo Carousel
- [ ] Chat window


