"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var types_1 = require("./types");
var styles_1 = __importDefault(require("./styles"));
var animationConfigs = function (isPressed) { return ({
    duration: 130,
    easing: react_native_1.Easing.inOut(react_native_1.Easing.linear),
    toValue: isPressed ? 1 : 0,
    useNativeDriver: true,
}); };
var springConfigs = function (toValue) { return ({
    toValue: toValue,
    overshootClamping: true,
    useNativeDriver: true,
}); };
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panResponder = null;
        _this.boundary = _this.props.width - _this.props.height;
        _this.circleAnimations = {
            direction: new react_native_1.Animated.Value(-1 * _this.boundary),
            prevDirection: -1 * _this.boundary,
            size: new react_native_1.Animated.Value(0),
        };
        _this.styleProps = {
            circleMargin: 0,
            maxCircleSize: 0,
        };
        _this.debounce = null;
        _this.onCircleTapIn = function () {
            return react_native_1.Animated.timing(_this.circleAnimations.size, animationConfigs(true)).start();
        };
        _this.onCircleTapOut = function () {
            var direction = _this.circleAnimations.direction._value;
            var isGoingLeft = direction > 0 ? !(direction > _this.boundary / 2) : true;
            var toValue = (isGoingLeft ? -1 : 1) * _this.boundary;
            react_native_1.Animated.parallel([
                react_native_1.Animated.spring(_this.circleAnimations.direction, springConfigs(toValue)),
                react_native_1.Animated.timing(_this.circleAnimations.size, animationConfigs(false)),
            ]).start(_this.onAnimationFinished(toValue, !isGoingLeft));
        };
        _this.onAnimationFinished = function (animationToValue, newValue) { return function () {
            _this.circleAnimations.direction.setValue(animationToValue);
            _this.circleAnimations.prevDirection = animationToValue;
            if (_this.props.value !== newValue) {
                _this.props.onValueChange(newValue);
            }
        }; };
        _this.toggle = function (newValue) {
            var toValue = (newValue ? 1 : -1) * _this.boundary;
            return react_native_1.Animated.parallel([
                react_native_1.Animated.spring(_this.circleAnimations.direction, springConfigs(toValue)),
                react_native_1.Animated.timing(_this.circleAnimations.size, animationConfigs(false)),
            ]).start(_this.onAnimationFinished(toValue, newValue));
        };
        return _this;
    }
    Switch.prototype.componentWillMount = function () {
        var _this = this;
        var _a = this.props, _b = _a.circleStyle, circleStyle = _b === void 0 ? {} : _b, height = _a.height, value = _a.value;
        this.styleProps.circleMargin = circleStyle.margin
            ? parseFloat(circleStyle.margin.toString())
            : styles_1.default.circle.margin;
        this.styleProps.maxCircleSize =
            height - (this.styleProps.circleMargin * 2 + 1);
        this.panResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function () { return !_this.props.disabled; },
            onPanResponderGrant: this.onCircleTapIn,
            onPanResponderMove: react_native_1.Animated.event([
                null,
                { dx: this.circleAnimations.direction },
            ]),
            onPanResponderRelease: this.onCircleTapOut,
        });
        if (typeof this.props.onRef === 'function') {
            this.props.onRef(this);
        }
        this.toggle(value);
    };
    Switch.prototype.shouldComponentUpdate = function (nextProps) {
        return (nextProps.value !== this.props.value ||
            nextProps.disabled !== this.props.disabled);
    };
    Switch.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.value !== this.props.value) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(function () { return _this.toggle(_this.props.value); }, 150);
        }
    };
    Switch.prototype.render = function () {
        var _a = this.props, containerStyle = _a.containerStyle, _b = _a.circleStyle, circleStyle = _b === void 0 ? {} : _b, backgroundColor = _a.backgroundColor, circleColor = _a.circleColor, contentView = _a.contentView, contentStyle = _a.contentStyle, thumbView = _a.thumbView, activeColor = _a.activeColor, disabledColor = _a.disabledColor, width = _a.width, height = _a.height, value = _a.value, disabled = _a.disabled, viewProps = __rest(_a, ["containerStyle", "circleStyle", "backgroundColor", "circleColor", "contentView", "contentStyle", "thumbView", "activeColor", "disabledColor", "width", "height", "value", "disabled"]);
        var circlePosition = this.circleAnimations.direction.interpolate({
            inputRange: value ? [-1 * this.boundary, 0] : [0, this.boundary],
            outputRange: [0, this.boundary],
            extrapolate: 'clamp',
        });
        return (react_1.default.createElement(react_native_1.View, __assign({}, viewProps, { style: [
                styles_1.default.container,
                containerStyle,
                {
                    backgroundColor: disabled ? disabledColor : backgroundColor,
                    width: width,
                    height: height,
                    borderRadius: height,
                },
            ] }),
            react_1.default.createElement(react_native_1.Animated.View, { style: [
                    styles_1.default.activeBackground,
                    __assign({ backgroundColor: disabled ? disabledColor : activeColor, borderRadius: height }, contentStyle, { opacity: react_native_1.Animated.divide(circlePosition, this.boundary).interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                            extrapolate: 'clamp',
                        }) }),
                ] }, contentView),
            react_1.default.createElement(react_native_1.Animated.View, __assign({}, this.panResponder.panHandlers, { style: [
                    styles_1.default.circle,
                    circleStyle,
                    {
                        backgroundColor: circleColor,
                        maxWidth: this.styleProps.maxCircleSize,
                        maxHeight: this.styleProps.maxCircleSize,
                        opacity: disabled ? 0.9 : 1,
                        transform: [
                            { translateX: circlePosition },
                            {
                                scale: this.circleAnimations.size.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [
                                        1,
                                        (height - (this.styleProps.circleMargin * 2.5 + 1)) /
                                            this.styleProps.maxCircleSize,
                                    ],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                ] }), thumbView)));
    };
    Switch.defaultProps = types_1.defaultProps;
    return Switch;
}(react_1.Component));
exports.default = Switch;
