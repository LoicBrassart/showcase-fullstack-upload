# Showcase: File upload

## Features

- Frontend supports any number of inputs, any number of files to upload
- Frontend provides a preview of the element being created
- Backend performs several linked SQL records (user + pictures) on the same route
- Backend records pictures in a specific folder, available from the frontend
- Backend makes the `public/` folder available for the frontend to get previously uploaded files

## Frontend

### Form

- uses a `fields` state. This state will hold _every_ information about the whole form (text fields and data about file fields)
- `handleChange` handles everything _but_ file uploads, because adding the preview feature needed a special behaviour. It updates `fields` with the right key/value pair, whatever the structure of your form
- `handleUpload` handles only file inputs. It updates `fields`, like `handleChange`, but records an **Object** with two keys: `preview` for the preview vizualization ; and `raw` containing the raw (sic) data to send to the backend
- `handleSubmit` stops default behaviour (forms reload the page in plain HTML, and **we don't want that** !), then records every key available in `fields` in a `FormData` structure (think about it as a structure _made_ to send data to a backend without too much pain). _NB: special case for files, it stores only the `raw` field, as preview aren't needed in the backend_. Once that's done, it calls the backend through `axios`
- `<Card>` is called at the end of the render to display the preview

### Card

- is a "dumb" component. It gets props from it's parent (`<Form>` for example, but it could be any component) and displays informations. It has no other role

## Backend

### "new" packages

- `fs`: Stands for "File System", is included in Node (that's why there's no installation needed for this one). It gives access to the hard drive, so we can read/write/create/delete files within our project
- `express-fileupload`: Needed to handle files transmitted by the frontend
- `mime-types`: Will allow us to guess the correct file extension for our new file, be it music mp3 pdf or anything else
- `uuid`: It's sole role is to create unique (though ugly) identifiers everytime it's called. Useful for file uploads

### Middlewares

- `upload`: Allows us to get our uploaded files (`req.files`)
- `express.json`: Allows to read `req.body` for most inputs
- `express.static('public')`: Allows for remote servers (frontend for example) to come and ask for files situated in the `public/` folder

### POST /form

- Normal inputs are stored in `req.body` as usual
- File uploads are stored in `req.files`, and use the same names as the inputs in the frontend
- First we try to insert a new user with all the text files, nothing new here (_NB: we store the `insertId` field from the answer, to know who to attach pictures to_)
  - If this works, we create a random filename for our avatar, and record our file in `public/upload/`
  - We then insert a new record in the database to store our new url, and the linked user
  - We then repeat the same exact steps to record our background

## Artefacts

Just contains a SQL dump for the tables needed

## Todo & ideas

- Add a gallery for previously recorded characters
