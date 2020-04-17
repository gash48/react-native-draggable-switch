declare const _default: {
    container: {
        borderWidth: number;
        borderColor: string;
        flexWrap: "wrap";
        justifyContent: "center";
    };
    activeBackground: {
        width: string;
        height: string;
        position: "absolute";
    };
    circle: {
        shadowColor: string;
        shadowOpacity: number;
        shadowRadius: number;
        shadowOffset: {
            height: number;
            width: number;
        };
        elevation?: undefined;
        marginTop?: undefined;
        margin: number;
        width: string;
        height: string;
        borderRadius: number;
    } | {
        elevation: number;
        marginTop: number;
        shadowColor?: undefined;
        shadowOpacity?: undefined;
        shadowRadius?: undefined;
        shadowOffset?: undefined;
        margin: number;
        width: string;
        height: string;
        borderRadius: number;
    };
};
export default _default;
