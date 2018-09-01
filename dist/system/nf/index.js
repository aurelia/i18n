System.register(["./nf-binding-behavior", "./nf-value-converter"], function (exports_1, context_1) {
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
            function (nf_binding_behavior_1_1) {
                exportStar_1(nf_binding_behavior_1_1);
            },
            function (nf_value_converter_1_1) {
                exportStar_1(nf_value_converter_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map