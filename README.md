![](http://f.cl.ly/items/391y4708420P0H001k1G/meteoric.png)

# meteor-ionic

### Build [Ionic](http://ionicframework.com/) apps in [Meteor](https://www.meteor.com/)!

## NOTE: This package is no longer being actively maintained. 

If you are interested in maintaining it, contact me through [my Github profile](https://github.com/nickw). Now that Meteor is officially supporting (and actively recommending) React and Angular, I suggest using [Ionic](https://github.com/driftyco/ionic), [Ionic 2](https://github.com/driftyco/ionic2) or [React-Ionic](https://github.com/pors/reactionic/) as alternatives for building hybrid mobile apps with Meteor.

## Overview

This is an attempt at **real Ionic and Meteor integration**. This is not just Ionic's CSS framework wrapped in a Meteor package. It aims to be a complete port of [Ionic’s Angular directives](http://ionicframework.com/docs/api/) to [Meteor Blaze](https://www.meteor.com/blaze) templates.

## Why?
[Ionic](http://ionicframework.com/) is arguably the most comprehensive, polished, cross-platform mobile framework available. But unfortunately a large portion of its functionality comes from Angular directives. [I'm not a fan of trying to force-fit Angular into Meteor](https://medium.com/space-camp/your-meteor-app-probably-doesnt-need-angular-13986a0323f6), so I wanted to see if I could rewrite Ionic specifically for Meteor.

## Getting started Guide
Check out the [GUIDE.md](GUIDE.md) for a guide on how to get started.

## Status

**Beta** See the TODO section below to see which Angular Directives have been ported to Blaze.

## Dependencies
Rather than include compiled or CDN versions of Ionic's CSS Framework we’ve extraced it into two separate packages:

- [meteoric:ionicons-sass](http://github.com/meteoric/ionicons-sass) Ionic’s Ionicons set wrapped for Meteor.
- [meteoric:ionic-sass](http://github.com/meteoric/ionic-sass) The base Ionic CSS Framework wrapped for Meteor.

## Examples

### Contacts App
A simple CRUD app to manage contacts.

[Demo](http://meteoric-contacts.meteor.com) |  [Code](https://github.com/meteoric/contacts)

### Meteor Hunt
A [Product Hunt](http://producthunt.com) clone built in Meteor Ionic. (In Progress)

[Demo](http://meteorhunt.meteor.com/) |  [Code](https://github.com/meteoric/meteorhunt)

### Demo of all components
The demo app of various meteoric components

[Demo](http://meteor-ionic.meteor.com/) |  [Code](https://github.com/meteoric/demo)

You can also keep track of the various other repos from the [Meteoric team](https://github.com/meteoric)

## TODO

### Angular Directives to convert to Blaze:
* [x] ActionSheet
* [x] Backdrop
* [x] Content
  * [x] ion-content
  * [x] ion-refresher (not necessary with Meteor)
  * [x] ion-pane
* [ ] Events (use a 3rd party library?)
* [x] Form Inputs (using [`meteoric:autoform-ionic`](https://github.com/meteoric/autoform-ionic))
  * [x] ion-checkbox
  * [x] ion-radio
  * [x] ion-toggle
* [ ] Gesture (use a 3rd party library?)
* [x] Headers/Footers
  * [x] ion-header-bar
  * [x] ion-footer-bar
* [x] Keyboard (requires [cordova](http://cordova.apache.org/) integration)
* [ ] Lists (needs edit/remove/sort functionality)
  * [ ] ion-list
  * [ ] ion-item
  * [ ] ion-delete-button
  * [ ] ion-reorder-button
  * [ ] ion-option-button
  * [ ] collection-repeat
* [x] Loading
* [x] Modal
* [x] Navigation (requires [iron:router](https://github.com/EventedMind/iron-router) integration)
  * [x] ion-nav-view
  * [x] ion-view
  * [x] ion-nav-bar
  * [x] ion-nav-back-button
  * [ ] ion-nav-buttons (not needed?)
  * [x] ion-nav-title
  * [ ] nav-transition (not needed?)
  * [ ] nav-direction (not needed?)
* [x] Platform
* [x] Popover
* [x] Popup
* [ ] Scroll
  * [ ] ion-scroll
  * [ ] ion-infinite-scroll
* [x] Side Menus
  * [x] ion-side-menus
  * [x] ion-side-menu-content
  * [x] ion-side-menu
  * [ ] expose-aside-when (not sure this is needed)
  * [x] menu-toggle
  * [x] menu-close
* [x] Slide Box
* [x] Tabs (requires [iron:router](https://github.com/EventedMind/iron-router) integration)
  * [x] ion-tabs
  * [x] ion-tab

## License
[MIT License](https://github.com/meteoric/meteor-ionic/blob/master/LICENSE)
