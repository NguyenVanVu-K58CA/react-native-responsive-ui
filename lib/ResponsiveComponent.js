// @flow
import {Component} from "react";

import Device, {AllDimensions, DimensionChangeSubscription} from "./Device";


export default class ResponsiveComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            window : Device.dimensions,
        }
    }

    subscription: DimensionChangeSubscription;

    static orientation() : string {
        const {width, height} = Device.dimensions.window;
        return  width > height ? "landscape" : "portrait";
    }

    componentWillMount() {
        this.subscription = Device.subscribeToDimensionChanges(dims => this.setState(dims));
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }
}