# > PlanningPoker

Planning Poker is a Web application build as a tool for estimating users' requests as described by the Scrum toolbox.

The app includes 2 main views which are automatically synchronised:

- Board: which displays the overview of the planning poker session. Can be a beamer, a laptop, a tablet or any mobile phone.
- Pig: each participant of the planning poker session uses his own mobile phone for selecting the story's estimate.

There's no login, the app is based on a unique session id.

Web site: http://pp.mungo.eu

## $ Documentation

[Click here](docs/index.md)

## $ Technologies

It's an Angular application scaffolded, developped and builded with angular-cli.

There's no back-end, the Angular application is directly connected to a Firebase database and makes great use of Observables for keeping the state of the application.

The site is totally responsive and can adapt to any device's size.

Techno summary: Angular4, TypeScript, Firebase, angularfire2, Rxjs, angular2-qrcode, Font-awesome, momentjs, 

NTDD: No Test Driven Development.  
:-(

## $ Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## $ Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## $ Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## $ Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## $ Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## $ Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
