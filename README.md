# Frontend Microservices

> An architecture of frontend microservices at runtime without webpack module federation, single-spa etc.

## Basic requirements

- Design and implement a web application consisting of several sub-applications to be loaded into the main application at runtime;
- Each application should be in a separate project and should have its own package.json, dependencies and a dedicated build process for creating its bundle file.

An example configuration file is:

```json
[
  {
    "id": "grid",
    "url": "http://[SERVER_URL]/[BUNDLE_NAME].js"
  }
]
```

## Initial thoughts

We will commit directly to `master` for ease of development and once the first version of the demo is ready, we will switch to a feature based approach and PRs, if anything else needs to be added.

I think the that the current project is a perfect use case for using a monorepo architecture. Given that I have tried it in the past, I will accomplish this using `lerna`. Thinking ahead, one situation where using lerna will help us in development is with creating a solution to share state between applications.

Looking at the example configuration, some things come to mind which are a bit of a concern at this point:

- the first thing is that the url starts with `http://` which means that they need to be served by some server, instead of just being imported as a package;
- the second is that we only import the `.js` file from the bundle, and as we know a modern web application has other assets apart from this.

We will use vite and react for the micro-frontend applications. Going forwards, we will assume that each application can run independently.

A rough plan for the implementation is:

1. Create the skeleton of the whole demo:

   - the base of the project;
   - the four applications;
   - the state sharing library;
   - the shell application;

2. Implement a solution to share state between the applications;
3. Implement testing and maybe some git hooks;
4. If there is time, other nice to haves will be implemented.

More info:

- [https://monorepo.tools/](https://monorepo.tools/)
- [https://lerna.js.org/](https://lerna.js.org/)
- [https://www.freecodecamp.org/news/what-is-trunk-based-development/](https://www.freecodecamp.org/news/what-is-trunk-based-development/)

## Implementation

### Create the base of the project

We will create the base and move to yarn, since it known for being faster than npm. However, speed is not a constraint for our project, so this is more of a fun thing to do:

- `npx lerna init`, then update the name of your project in`package.json`;
- we will then update `lerna.json` to use `yarn` as a package manager:
  ```json
  {
    "$schema": "node_modules/lerna/schemas/lerna-schema.json",
    "npmClient": "yarn",
    "version": "independent"
  }
  ```
- `rm -Rf node_modules/`
- `rm package-lock.json`
- `yarn install`

Now we will create the packages:

- `npx lerna create app-grid -y`
- `npx lerna create app-image -y`
- `npx lerna create app-list -y`
- `npx lerna create app-text -y`
- `npx lerna create common-state -y`
- `npx lerna create shell -y`

Then, `app-list` and `shell` we will append the first dependency in a lerna format:

```json
{
  ...
  "dependencies": {
    "common-state": "file:../common-state"
  }
}
```

Once this is done, you need to run `yarn install` again.

Read more:

- [https://lerna.js.org/docs/getting-started](https://lerna.js.org/docs/getting-started)
- [https://www.velotio.com/engineering-blog/scalable-front-end-with-lerna-yarn-react](https://www.velotio.com/engineering-blog/scalable-front-end-with-lerna-yarn-react)
- [https://github.com/vuestorefront/vue-storefront/blob/main/lerna.json](https://github.com/vuestorefront/vue-storefront/blob/main/lerna.json)

### Add functionality to the sub apps

In this step, we will create the four apps. For the sake of simplicity, we will use the same solution: vite as a bundler, with react and typescript. It will be the base project in all cases. So, in each of the folders of the apps, we will run the command `npx create-vite .`, overwrite the content and the create the minimal apps inside each of the apps.

The next step we will do is remove most of the boilerplate in each of the projects and then add the minimal functionality needed.

### Create the shell application

We will start with `npx create-vite .` inside `./packages/shell`, as we did for the other projects. Then we will do the same cleanup and add minimal CSS to separate the page into the four sections we want to display.

Since we are dividing the screen in 4 separate sections, **we will assume** that these sections will always be present and they are the only sections which can be shown in the application.

### Share state between apps

We will use an event bus solution for sharing the state. It's a very simple approach, but which comes with the disadvantage that all apps need to be already loaded when an event happens. However, it fits our use case, and given the time constraint, we will move forward with the implementation of other features.
