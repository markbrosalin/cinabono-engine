export class SafeRunner {
    constructor() {
        this.errors = [];
    }
    run(scope, fn) {
        let result = null;
        try {
            result = fn();
        }
        catch (error) {
            this.errors.push({ scope, error });
        }
        return { errors: this.errors, result };
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    getErrors() {
        return this.errors;
    }
    clear() {
        this.errors = [];
    }
}
