System.register(["./t-binding-behavior", "./t-custom-attribute", "./t-params-custom-attribute", "./t-value-converter"], function (exports_1, context_1) {
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
            function (t_binding_behavior_1_1) {
                exportStar_1(t_binding_behavior_1_1);
            },
            function (t_custom_attribute_1_1) {
                exportStar_1(t_custom_attribute_1_1);
            },
            function (t_params_custom_attribute_1_1) {
                exportStar_1(t_params_custom_attribute_1_1);
            },
            function (t_value_converter_1_1) {
                exportStar_1(t_value_converter_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map