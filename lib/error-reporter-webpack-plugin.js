/**
 * @param options
 * @param options.count print the overall error count
 * @param options.first print the first error
 * @param options.last print the last error
 * @param options.all print all errors (in short format)
 * @constructor
 */
function ErrorReporterPlugin(options) {
    this.options = options;
}

ErrorReporterPlugin.prototype.apply = function (compiler) {
    const options = this.options;

    compiler.plugin('done', function ({compilation = {}} = {}) {

        const errors = compilation.errors;
        if (!errors || !errors.length) {
            return true;
        }

        console.log('\n- - - error report - - -');

        if (options.count) {
            printCount(errors);
        }
        if (options.first) {
            printFirst(errors);
        }
        if (options.last) {
            printLast(errors);
        }
        if (options.all) {
            printAll(errors);
        }

        console.log();
        process.exit(0);
    });
};

function printCount(errors) {
    console.log(`\n > error count: ${errors.length}`);
}

function printFirst(errors) {
    console.log('\n > first error:');
    let error = errors[0];
    printV(error);
}

function printLast(errors) {
    console.log('\n > last error:');
    let error = errors[errors.length - 1];
    printV(error);
}

function printV(error) {
    console.log(`[${error.name}]
${error.error.toString()}
   @ ${error.origin.resource}`);
}

function print(error) {
    console.log(error.error.toString());
}

function printAll(errors) {
    console.log('\n > all errors:');
    errors.forEach(print);
}

module.exports = ErrorReporterPlugin;