# TaskManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Tools & Techniques Used

- **Angular CLI 19.0.6**: A command-line tool that simplifies the creation, development, and maintenance of Angular applications.
- **Dependency Injection**: Used to manage service dependencies, improving modularity and testability.
- **RxJS (Observer Pattern)**: Handles asynchronous data streams, such as HTTP requests and real-time updates.
- **Lazy Loading**: Improves application performance by loading feature modules only when needed.

## Project Structure

The application follows a **feature-based modular architecture**, which consists of:

### **Core Module**
Contains globally shared functions, services, and models that do not relate to any specific feature. This module includes:

- **Static Components**: Header, footer, navbar, sidebar.

### **Shared Module**
Encapsulates reusable components, directives, and pipes that are shared across multiple feature modules. Examples:
- **Search Bars**
- **Loaders**
- **UI Components for Forms and Tables**

### **Feature Modules**
Encapsulates specific application functionalities. Each feature is self-contained, ensuring:
- **Single Responsibility Principle** (SRP)
- **Code Independence**
- **Easier Maintenance & Scalability**

## Design Patterns Implemented

### **Smart & Dumb Components**
- **Smart Components** (Containers): Manage business logic, handle API calls, and process data for forms and tables.
- **Dumb Components** (Presentational): Focus on displaying data and emitting events without managing state or logic.


### **Observer Pattern (RxJS)**
- Used for handling real-time data updates and asynchronous events.
- Ensures efficient state management by allowing components to react to data changes.

### **Dependency Injection**
- Services are injected into components, keeping business logic separate from UI logic.
- Improves code reusability and makes unit testing easier.

## Key Technical Decisions

- **Use of Angular CLI**: Simplifies project setup, component generation, and test execution.
- **Modular Code Structure**: Enhances scalability by allowing teams to work on independent feature modules.
- **API Key Authentication (Backend)**: Uses an `X-Api-Key` in the headers to secure API access.

## NOTE

To enter the application, enter any `email` with a valid structure and enter a value in the `password` field.
