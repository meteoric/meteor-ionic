class Delegate {
    constructor() {
        this.aggregate = [];
    }

    addAggregate(aggregate) {
        this.aggregate.push(aggregate);
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