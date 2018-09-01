System.register(["./df-binding-behavior", "./df-value-converter"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (df_binding_behavior_1_1) {
                exportStar_1(df_binding_behavior_1_1);
            },
            function (df_value_converter_1_1) {
                exportStar_1(df_value_converter_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map