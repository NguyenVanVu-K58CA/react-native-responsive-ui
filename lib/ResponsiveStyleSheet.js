// @flow
import * as _ from "lodash";
import {StyleSheet} from "react-native";
import Device from "./Device";
import MediaQuerySelector, {MediaQuery} from "./MediaQuerySelector";

type MediaQueryStyle = {
    query: MediaQuery,
    style: StyleSheet.Styles
};

export default class MediaQueryStyleSheet {
    static select(styles: MediaQueryStyle[]): StyleSheet.Styles {
        const {width, height} = Device.dimensions.window;
        const selectedStyles: StyleSheet.Styles[] = [];
        styles.forEach(style =>
            MediaQuerySelector.query(style.query, width, height) ? selectedStyles.push(style.style) : undefined
        );
        return _.merge.apply(null, selectedStyles);
    }

    static create(styles: {}): StyleSheet.Styles {
        const {width, height} = Device.dimensions.window;
        const currentOrientation: Orientation = width > height ? "landscape" : "portrait";
        let selectedStyles = {};

        if(Device.isTablet) {
            for (const styleName in styles) {
                if (styles.hasOwnProperty(styleName)) {
                    const style = styles[styleName];
                    const {landscape, portrait, phone, ...rest} = style;
                    selectedStyles[styleName] = {...styleName[currentOrientation], ...rest}
                }
            }
        } else {
            for (const styleName in styles) {
                if (styles.hasOwnProperty(styleName)) {
                    const style = styles[styleName];
                    const {landscape, portrait, phone, ...rest} = style;
                    selectedStyles[styleName] = {...phone, ...rest}
                }
            }
        }

        return {
            ...selectedStyles
        }
    }

}