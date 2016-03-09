/**
 * meteoric specific polyfill (not from ionic).
 */

let jqLite = $;
function jqLiteInheritedData(element, name, value) {
    // if element is the document object work with the html element instead
    // this makes $(document).scope() possible
    if (element.nodeType == Node.NODE_TYPE_DOCUMENT) {
        element = element.documentElement;
    }
    var names = _.isArray(name) ? name : [name];

    while (element) {
        for (var i = 0, ii = names.length; i < ii; i++) {
            if (!_.isUndefined(value = jqLite.data(element, names[i]))) return value;
        }

        // If dealing with a document fragment node with a host element, and no parent, use the host
        // element as the parent. This enables directives within a Shadow DOM or polyfilled Shadow DOM
        // to lookup parent controllers.
        element = element.parentNode || (element.nodeType === Node.NODE_TYPE_DOCUMENT_FRAGMENT && element.host);
    }
}

$.inheritedData = jqLiteInheritedData;