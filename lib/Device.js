// @flow
import {Dimensions as RNDims} from "react-native";

export interface Dimensions {
    width: number,
    height: number,
    scale: number,
    fontScale: number
}

export interface AllDimensions {
    window: Dimensions
}

export const SCREEN_SIZE_STANDARD = {
    NORMAL_SCREEN : {
        WIDTH: 320
    },
    LARGE_SCREEN : {
        WIDTH: 480
    },
    XLARGE_SCREEN: {
        WIDTH: 720
    }
};

export interface DimensionChangeSubscription {
    unsubscribe(): void
}

export default class Device {

    //  eslint-disable-next-line
    static subscribeToDimensionChanges(handler: (Object) => void): DimensionChangeSubscription {
        RNDims.addEventListener("change", handler);
        return {
            unsubscribe: () => RNDims.removeEventListener("change", handler)
        }
    }

    static get dimensions(): AllDimensions {
        const window = RNDims.get("window");
        return {
            window
        };
    }

    static get isTablet(): boolean{
        const {width, height, ...rest} = RNDims.get("window");
        const deviceWidth  = width > height ? height : width;
        if (deviceWidth > SCREEN_SIZE_STANDARD.LARGE_SCREEN.WIDTH) return true;
        return false;
    }
}