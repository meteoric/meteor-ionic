class Delegate {
    constructor() {
        this.aggregate = [];
    }

    addAggregate(aggergate) {
        this.aggregate.push(aggergate);
    }

    removeAggregate(aggregate) {
        let index = this.aggregate.indexOf(aggregate);
        if (index !== -1) {
            this.aggregate.splice(1, index);
        }
    }

    callMethod() {
        let method = arguments.shift();
        this.aggregate[method].apply(this, arguments);
    }

    addMethods(methods) {
        methods.forEach(method => {
            this[method] = function() {
                arguments.unshift(method);
                this.callMethod.apply(this, arguments)
            }
        }, this);
    }
};

meteoric.lib.Delegate = Delegate;