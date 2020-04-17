import { ViewStyle, ViewProps } from 'react-native';
export interface ISwitchProps extends ViewProps {
    containerStyle?: ViewStyle;
    circleStyle?: ViewStyle;
    backgroundColor?: string;
    circleColor?: string;
    activeColor?: string;
    disabledColor?: string;
    width: number;
    height: number;
    value: boolean;
    disabled?: boolean;
    onValueChange(value: boolean): any;
    onRef?(value: any): any;
    contentView?: any;
    contentStyle?: any;
    thumbView?: any;
}
export declare const defaultProps: {
    backgroundColor: string;
    circleColor: string;
    activeColor: string;
    disabledColor: string;
};
