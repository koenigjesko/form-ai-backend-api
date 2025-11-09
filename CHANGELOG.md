# Changelog

### [CHANGELOG in russian language](./CHANGELOG_RU.md)

### **`v.0.1.2-alpha` from 09.11.2025**
- The relational database is connected and configured and later must be integrated into new parts of project.
- Added 2 new API paths: `/api/v1/authorize-user` and `/api/v1/register-new-user`. Full details in [README.md](./README.md)
- Existing code has been optimized and improved, and many non-API-related components have been improved.

### **`v.0.1.1-alpha` from 03.11.2025**
### Added
- When making a POST request to the `/api/v1/generate-from-multiple` and `/api/v1/generate-from-single` routes, the `user_id` parameter — a unique user ID — must now be specified in the request parameters.
- Route names have been changed. Full details in [README.md](./README.md)
- Implemented a basic database structure, with the main part integrated into `/api/v1/generate-from-single`.
- Added saving of necessary parameters to the corresponding database tables.

### Changed
- Updated and extended parameters used when creating API requests.
- Improved and optimized existing code to increase stability and performance.
