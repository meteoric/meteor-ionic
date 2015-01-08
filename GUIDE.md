## Package Requirements
Make sure you have the required packages installed:

```
iron:router
fourseven:scss
meteoric:ionic-sass
meteoric:ionicons-sass
meteoric:ionic
```

## Blaze Templates

`meteor-ionic` makes extensive use of Blaze Templates. There are two ways to include a Blaze Template into your page: inclusion syntax and block syntax.

### Inclusion Syntax
Most Meteor developers are already familiar with the inclusion syntax which takes a template like this:

```
<template name="myTemplate">
  <div class="my-template">
    Static content here
  </div>
</template>
```

And lets you include it in another template like this:
```
<h1>Another Template</h1>
{{> myTemplate}}
```

Which outputs this:
```
<h1>Another Template</h1>
<div class="my-template">
  Static content here
</div>
```

### Block Helpers
The block syntax (also called block helpers) is much more interesting. A block helper allows us to create a "wrapper" template like so:

```
<template name="myTemplate">
  <div class="my-template">
    {{> UI.contentBlock}}
  </div>
</template>
```

And inject custom content into it when we include it on the page:
```
<h1>Another Template</h1>
{{#myTemplate}}
  Custom content goes here
{{/myTemplate}}
```

Which outputs this:
```
<h1>Another Template</h1>
<div class="my-template">
  Custom content goes here
</div>
```

### `meteor-ionic` Components
`meteor-ionic` uses these "block helpers" to mimic Angular's "directives" feature which is prevalent in Ionic. There are a few reasons for this:

#### 1. Convenience

Some components may require several `<div>`'s or class names which can be difficult to remember. These can be abstracted away into the wrapper template allowing you to simply type a component name such as `{{#ionContent}}`.

#### 2. Configuration options

Using block helpers we can pass simple options to our template (e.g. `align='left'`, `title='My Modal'`) and let the template convert those options into CSS classes or HTML content.

For example a fictional `myPanel` component could be initialized like this:

```
{{#myPanel title="Meteoric" type="primary"}}
  <p>Meteor + Ionic = Meteoric</p>
{{/myPanel}}
```

And could then output:

```
<div class="my-panel is-primary">
  <div class="my-panel-header">
    <h1>Meteoric</h1>
  </div>
  <div class="my-panel-body">
    <p>Meteor + Ionic = Meteoric</p>
  </div>
</div>
```

#### 3. Advanced Functionality

Some of the more advanced components like `ionNavView`, `ionNavBar`, `ionModal`, etc provide full HTML structures, events and animations all with a single template include.

## Layout Structure

### ionBody
All meteor-ionic apps must have an `ionBody` component at the root. This element has various classes and event handlers attached to it. In your `iron:router` layout, make sure you have an `ionBody` component surrounding your `{{>yield}}`:

```
{{#ionBody}}
  {{>yield}}
{{/ionBody}}
```

### ionContent
You will almost always want to wrap your templates in an `ionContent` component. The `ionContent` has two primary responsibilities:

1. Implements native-feeling scrolling on the device using `-webkit-overflow-scrolling: touch;`
2. Positions itself appropriately from the top or bottom of the screen when headers, footers and tabs are present.

Most of your templates will follow this pattern:

```
{{#ionContent}}
  <p>Your content here</p>
{{/ionContent}}
```

Which will output:

```
<div class="scroll-content ionic-scroll">
  <div class="content overflow-scroll">
    <p>Your content here</p>
  </div>
</div>
```

The `ionContent` component also accepts arbitrary CSS classes. For example, to use Ionic's built in `padding` class to add padding around your content, you can do:

```
{{#ionContent class="padding"}}
  <p>Your content here</p>
{{/ionContent}}
```

Which would output:

```
<div class="scroll-content ionic-scroll">
  <div class="content overflow-scroll padding">
    <p>Your content here</p>
  </div>
</div>
```

## Navigation Stacks

To mimic the sliding-back-and-forth navigation UI of mobile apps, meteor-ionic makes use of the three primary technologies:

- `iron:router`
- `iron:layout`
- Meteor's `_uihooks`

#### Layout
As previously mentioned, your layout should have an `ionBody` component at the root. Inside of this you will want to wrap your `yield` in an `ionNavView`, which will take care of animating the templates that `iron:router` renders. Lastly, you'll probably want an `ionNavBar` element at the top of your screen to show the title of the page, as well as navigation items and other action buttons.

```
{{#ionBody}}
  {{> ionNavBar}}

  {{#ionNavView}}
    {{> yield}}
  {{/ionNavView}}
{{/ionBody}}
```

#### Templates
In the individual templates that get rendered in the navigation stack, you will want to follow this pattern:

```
{{#contentFor "headerButtonLeft"}}
  {{>ionNavBackButton}}
{{/contentFor}}

{{#contentFor "headerTitle"}}
  <h1 class="title">Notifications</h1>
{{/contentFor}}

{{#ionView}}
  {{#ionContent}}
    Content goes here
  {{/ionContent}}
{{/ionView}}
```

The `ionView` component simply adds some CSS rules that allow it to be animated properly and the `ionContent` component should look familiar by now. However the `contentFor` blocks probably need some explaining:

### ionNavBar
This is where `iron:layout` comes into play. Our `ionNavBar` component exposes three "regions" that you can insert content into: "headerButtonLeft", "headerButtonRight" and "headerTitle". Whatever content you put inside the `contentFor` block will get inserted (and in this case, animated) into the correct region.

## Tabs

TODO

## Modals

The `ionModal` component is quite easy to implement. First, create a template for your modal:

```
<template name="myModal">
  {{#ionModal title="My Modal"}}
    <p>My modal content goes here</p>
  {{/ionModal}}
</template>
```

Then attach it to a `button` or `a` element by passing in the name of the template to the `data-ion-modal` attribute.

```
<button data-ion-modal="myModal">Open Modal</button>
```
