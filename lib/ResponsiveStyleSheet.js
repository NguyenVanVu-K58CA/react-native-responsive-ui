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
        for(const styleName in styles){
            if(styles.hasOwnProperty(styleName)){
                const style = styles[styleName];
                if(style.hasOwnProperty('landscape') && style.hasOwnProperty('portrait')){
                    const {landscape, portrait, ...rest} = style;
                    selectedStyles[styleName] = {...style[currentOrientation], ...rest};
                } else if (style.hasOwnProperty('landscape')) {
                    const {landscape, ...rest} = style;
                    if(currentOrientation === "landscape"){
                        selectedStyles[styleName] = {...landscape, ...rest};
                    } else {
                        selectedStyles[styleName] = {...rest}
                    }
                } else if (style.hasOwnProperty('portrait')){
                    if(currentOrientation === "portrait"){
                        selectedStyles[styleName] = {...landscape, ...rest};
                    } else {
                        selectedStyles[styleName] = {...rest}
                    }
                } else {
                    selectedStyles[styleName] = {...style};
                }
            }
        }

        return {
            ...selectedStyles
        }
    }

}