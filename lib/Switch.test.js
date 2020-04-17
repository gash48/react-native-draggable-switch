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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
var Switch_1 = __importDefault(require("./Switch"));
enzyme_1.configure({
    adapter: new enzyme_adapter_react_16_1.default(),
});
jest.useFakeTimers();
var fakeGestureEvent = {
    nativeEvent: {
        changedTouches: [
            {
                identifier: '2333',
                changedTouches: [],
                locationX: 23,
                locationY: 23,
                pageX: 0,
                pageY: 0,
                target: '123',
                timestamp: 23333,
                touches: [],
            },
        ],
        identifier: '1',
        locationX: 23,
        locationY: 23,
        pageX: 0,
        pageY: 0,
        target: '123',
        timestamp: 233333,
        touches: [
            {
                identifier: '2333',
                changedTouches: [],
                locationX: 23,
                locationY: 23,
                pageX: 0,
                pageY: 0,
                target: '123',
                timestamp: 2333333,
                touches: [],
            },
        ],
    },
    currentTarget: 2333,
    target: 2333,
    timeStamp: 23333333,
    type: 'fake',
    eventPhase: 23333,
    bubbles: false,
    cancelable: false,
    isTrusted: false,
    defaultPrevented: false,
    isDefaultPrevented: function () { return false; },
    preventDefault: function () { return null; },
    isPropagationStopped: function () { return false; },
    stopPropagation: function () { return null; },
    persist: function () { return null; },
};
describe('Switch', function () {
    describe('required props only', function () {
        var props = {
            width: 50,
            height: 30,
            value: false,
            onValueChange: jest.fn(),
        };
        var rendered = enzyme_1.shallow(react_1.default.createElement(Switch_1.default, __assign({}, props)));
        var instance = rendered.instance();
        it('smoke test', function () {
            expect(rendered).toBeDefined();
        });
        it('changes with value prop change', function () {
            rendered.setProps({ value: true });
            jest.runAllTimers();
            expect(rendered
                .find('AnimatedComponent')
                .last()
                .props().style[2].transform[0].translateX._parent._value).toEqual(props.width - props.height);
            rendered.setProps({ value: false });
            jest.runAllTimers();
            expect(rendered
                .find('AnimatedComponent')
                .last()
                .props().style[2].transform[0].translateX._parent._value).toEqual(-1 * (props.width - props.height));
            rendered.setProps({ value: false });
            jest.runAllTimers();
            expect(rendered
                .find('AnimatedComponent')
                .last()
                .props().style[2].transform[0].translateX._parent._value).toEqual(-1 * (props.width - props.height));
        });
        it('can be tapped without crash', function () {
            var circleProps = rendered
                .find('AnimatedComponent')
                .last()
                .props();
            expect(circleProps).toHaveProperty('onStartShouldSetResponder');
            expect(circleProps).toHaveProperty('onResponderGrant');
            expect(circleProps).toHaveProperty('onResponderMove');
            expect(circleProps).toHaveProperty('onResponderRelease');
            circleProps.onStartShouldSetResponder(fakeGestureEvent);
            // TODO: mock the data right, if possible, to get the 2 below working
            // circleProps.onResponderGrant(fakeGestureEvent)
            // circleProps.onResponderMove(fakeGestureEvent)
            instance.onCircleTapIn();
            instance.circleAnimations.direction.setValue(0);
            circleProps.onResponderRelease(fakeGestureEvent);
        });
        it('can tap on the background without crash', function () {
            rendered
                .find('TouchableWithoutFeedback')
                .first()
                .simulate('press');
        });
        it('can be dragged without crash', function () {
            var circleProps = rendered
                .find('AnimatedComponent')
                .last()
                .props();
            circleProps.onStartShouldSetResponder(fakeGestureEvent);
            // TODO: mock the data right, if possible, to get the 2 below working
            // circleProps.onResponderGrant(fakeGestureEvent)
            // circleProps.onResponderMove(fakeGestureEvent)
            // Mimic drag right
            instance.onCircleTapIn();
            instance.circleAnimations.direction.setValue(20);
            circleProps.onResponderRelease(fakeGestureEvent);
            // Mimic drag left
            instance.onCircleTapIn();
            instance.circleAnimations.direction.setValue(-20);
            circleProps.onResponderRelease(fakeGestureEvent);
            // Mimic drag to middle toward left
            instance.onCircleTapIn();
            instance.circleAnimations.direction.setValue(16);
            circleProps.onResponderRelease(fakeGestureEvent);
        });
    });
    describe('disabled handling', function () {
        var props = {
            width: 50,
            height: 30,
            value: true,
            onValueChange: jest.fn(),
            disabled: true,
            circleStyle: {
                margin: 5,
            },
        };
        var rendered = enzyme_1.shallow(react_1.default.createElement(Switch_1.default, __assign({}, props)));
        it('smoke test', function () {
            expect(rendered).toBeDefined();
        });
        it('changes is able to disabled status', function () {
            rendered.setProps({
                disabled: false,
                value: true,
            });
            expect(rendered).toBeDefined();
        });
    });
});
