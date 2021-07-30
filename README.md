## Features

- Frontend supports any number of inputs, any number of files to upload
- Frontend provides a preview of the element being created
- Backend performs several linked SQL records (user + pictures) on the same route
- Backend records pictures in a specific folder, available from the frontend

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

## Artefacts

Just contains a SQL dump for the tables needed
