import { Component } from 'react';
import { Animated } from 'react-native';
import { ISwitchProps } from './types';
export default class Switch extends Component<ISwitchProps> {
    static defaultProps: {
        backgroundColor: string;
        circleColor: string;
        activeColor: string;
        disabledColor: string;
    };
    panResponder: any;
    boundary: number;
    circleAnimations: {
        direction: Animated.Value;
        prevDirection: number;
        size: Animated.Value;
    };
    styleProps: {
        circleMargin: number;
        maxCircleSize: number;
    };
    debounce: any;
    componentWillMount(): void;
    shouldComponentUpdate(nextProps: ISwitchProps): boolean;
    componentDidUpdate(prevProps: ISwitchProps): void;
    onCircleTapIn: () => void;
    onCircleTapOut: () => void;
    onAnimationFinished: (animationToValue: number, newValue: boolean) => () => void;
    toggle: (newValue: boolean) => void;
    render(): JSX.Element;
}
