Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('actionSheet');
  this.route('backdrop');
  this.route('forms');
  this.route('headersFooters');
  this.route('lists');
  this.route('loading');
  this.route('modal');
  this.route('navigation');
  this.route('popover');
  this.route('popup');
  this.route('sideMenu');
  this.route('slideBox');
  this.route('tabs.one', {path: '/tabs/one'});
  this.route('tabs.two', {path: '/tabs/two'});
  this.route('tabs.three', {path: '/tabs/three'});
  this.route('tabs.four', {path: '/tabs/four'});
  this.route('userAccounts');
});
