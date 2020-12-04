module.exports = {

    contextSeparator: '_',

    createOldCatalogs: true,

    defaultNamespace: 'translations',

    defaultValue: '',

    indentation: 4,

    keepRemoved: false,

    keySeparator: '.',

    lexers: {
        js: ['JavascriptLexer', 'JsxLexer'],

        default: ['JavascriptLexer']
    },

    lineEnding: 'auto',

    locales: ['en', 'de', 'fr'],

    namespaceSeparator: ':',

    output: 'src/lang/$LOCALE/$NAMESPACE.json',

    input: '*.js',

    sort: false,

    skipDefaultValues: false,

    useKeysAsDefaultValue: false,

    verbose: false,

    failOnWarnings: false,

    customValueTemplate: null

}
