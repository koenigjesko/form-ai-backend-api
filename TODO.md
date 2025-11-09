# Tasks set during development:

#### Done:
- [x] Make uploading file limit.
- [x] Conduct full unit testing (optional) (The decision was made to abandon it, taking into account the sustainability of the project's tools).
- [x] It is necessary to consider the possibility of creating a database connection pool for multi-threaded work with the database. (During the analysis of possible options, it was decided to abandon this idea in favor of procedural connections.)
- [x] May be `nodemon` js-package will be installed for faster debug. (Due to the complexity of working with the API in general, it was decided not to add this tool).
- [x] Connect and configure a relational database (already in progress).

#### Tasks in progress
- [ ] Change Multer initialization parameters!!!
- [ ] Implement correct storage and naming of files.
- [ ] Implement authorization, as well as lay the foundation for storing logins and passwords, and possibly enable data storage in cookies.
- [ ] Based on the previous point, implement new request paths for user authorization and registration.

#### Goals for the future:
- [ ] Consider and implement storage of user authorization data in a secure (encrypted?) form.
- [ ] Integrate a neural network to generate the final product.
