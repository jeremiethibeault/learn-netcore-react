# Project

- [Building an app with .Net Core and React](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/)

## Technologies

### Backend / API
- [.NET Core 3.0](https://github.com/dotnet/aspnetcore) for the API and controllers
- [EntityFrameworkCore](https://docs.microsoft.com/en-us/ef/core/) as a code first ORM (object-relational mapping)
- [SQLite](https://www.sqlite.org/index.html) as a database provider
- [MediatR](https://github.com/jbogard/MediatR) for CQRS (Command and queries responsibility segregation)
- [ASP Middlewares](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1) for error handling
- [FluentValidation](https://fluentvalidation.net/) for data validation
- [User-secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=windows) for secret storage
- [Cloudinary](https://cloudinary.com/) for image cloud storage.
- [Microsoft SignalR](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio) for realtime WebSocket updates

### Frontend / Client
- [React](https://reactjs.org/) for the SPA (single page application)
- [TypeScript](https://www.typescriptlang.org/) for code logic
- [Axios](https://github.com/axios/axios) for http requests
- [MobX](https://mobx.js.org/README.html) for state management
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) for state mangement
- [React Semantic UI](https://react.semantic-ui.com/) for styling
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start) for navigation routing
- [React Toastify](https://www.npmjs.com/package/react-toastify) to show toasts
- [React Widgets](https://jquense.github.io/react-widgets/) for UI controls
- [React Final Form](https://github.com/final-form/react-final-form) for forms
- [Date-Fns](https://date-fns.org/) for date handling
- [Revalidate](https://github.com/jfairbank/revalidate) for data validation
- [Uuid](https://www.npmjs.com/package/uuidv4) for id generations
- [React Cropper](https://www.npmjs.com/package/react-cropper) for image cropping
- [React Dropzone](https://www.npmjs.com/package/react-dropzone) for file upload
- [Microsoft SignalR](https://www.npmjs.com/package/@microsoft/signalr) for realtime WebSocket updates
- [React Infinite Scroller](https://www.npmjs.com/package/react-infinite-scroller) for infinite scrolling

### Database

- For development purposes an SQLite database was used.

- For testing purposes, a MySQL server (community) was used.
    - Install [MySQL server Community](https://downloads.mysql.com/archives/community/).

    - Create a user `appuser`.

## Running the project

1. Start the backend API: `cd API` then `dotnet run`.

1. Start the web client: `cd client-app` then `npm start`.

## Building the project for deployment

1. Build the web client: `cd client-app` then `npm build`.

1. This will create an optimized webapp and move it to the `wwwroot` folder of the API.
