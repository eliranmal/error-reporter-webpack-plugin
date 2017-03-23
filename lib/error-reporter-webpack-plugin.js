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
        
        console.log('\n');
        console.log('- - - error report - - -');

        if (options.count) {
            console.log();
            console.log(`> error count: ${errors.length}`);
        }

        if (options.first) {
            console.log();
            console.log('> first error:');
            let error = errors[0];
            console.log(`[${error.name}]: ${error.error.toString()}
@ ${error.origin.resource}`);
        }

        if (options.last) {
            console.log();
            console.log('> last error:');
            let error = errors[errors.length - 1];
            console.log(`[${error.name}]: ${error.error.toString()}
@ ${error.origin.resource}`);
        }

        if (options.all) {
            console.log();
            console.log('> all errors:');
            errors.forEach((error) => {
                console.log(error.error.toString());
            });
        }

        console.log();
        process.exit(0);
    });
};

module.exports = ErrorReporterPlugin;