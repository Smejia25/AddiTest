# AddiTest

Libraries used:

- React Navigation: Very thorough library for mobile navigation
- MobX State Tree: State management library, i choose it because its a middle point between redux and mobx, it has a well defined workflow but is not as verbose as reedux
  -FlashList: shopify implementation of list, very easy to implement and very performant with larger lists
- reanimated: for animations

- unit tested store changes and api calls
- couldn't write ui test because some config issues that were breaking the build, and didnt have time to address it.


## Quick Start

**components**
This is where the reusable components live.

**models**
This is where the app model live. Each model has a directory which will contain the `mobx-state-tree` model file, test file.

**screens**
This is where the main views are. A screen is a component which will take up the entire screen and be part of the navigation stack.

**services**
services that connect with the leads api will live here (REST APIs).

**theme**
Here lives the theme with some basic values for colors, ..etc.

**app.tsx** This is the entry point of the app

### ./assets directory

For the Icons and Images

### ./LeadsApi directory

small express server for the lead endpoints

# How to Run

you would probably need to install the xcode simulator is the easiest way to test the app

simulators install guide [https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators]

first install dependencies use your preferred package manager pnpm | yarn | npm run on the base of the project
`pnpm install`

then run `pnpm run server` this will start the express server

then with the IOS simulator running run `pnpm run ios`
