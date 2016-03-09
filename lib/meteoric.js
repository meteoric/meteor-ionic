
// Create global ionic obj and its namespaces
// build processes may have already created an ionic obj
window.ionic = window.ionic || {};
window.ionic.views = {};
//window.ionic.version = '<%= pkg.version %>';  // todo: implement a templating here.
window.ionic.version = '1.2.4';

window.meteoric = window.ionic;

/**
 * A place to put non-element ionic directives that can't really be represent
 * by a blaze template.
 */
window.meteoric._directives = {};

window.meteoric.lib = {};
window.meteoric.controller = {};
window.meteoric.service = {};
window.meteoric.config = {};