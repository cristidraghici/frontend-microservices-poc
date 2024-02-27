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

Then, inside each of the packages except `common-state` we will append the first dependency in a lerna format:

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
