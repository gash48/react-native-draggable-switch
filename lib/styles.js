"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: '#EFEEF0',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    activeBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    circle: __assign({ margin: 3.5, width: '100%', height: '100%', borderRadius: 9999 }, react_native_1.Platform.select({
        ios: {
            shadowColor: '#333333',
            shadowOpacity: 0.25,
            shadowRadius: 1,
            shadowOffset: {
                height: 1,
                width: 0,
            },
        },
        android: {
            elevation: 2,
            marginTop: 3,
        },
    })),
});
