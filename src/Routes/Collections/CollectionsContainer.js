import React from "react";
import CollectionsPresenter from "./CollectionsPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
    
    constructor(props) {
        super(props);
        const {
            location: {pathname}
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isCollections: pathname.includes("/collections/")
        };
        console.log(props);
    }

    async componentDidMount() {
        
    }

    render() {
        const { result, error, loading } = this.state;
        console.log(result);
        return <CollectionsPresenter/>;
    }
}