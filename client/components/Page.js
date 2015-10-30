import BaseComponent from './BaseComponent';
import {query} from '../datatree';

export default class Page extends BaseComponent {
    constructor (props) {
        super(props);
        this.onError = this.onError.bind(this);
    }
    onError (error) {
        console.error(error);
    }
    getPageName () {
        throw new Error("getPageName() needs to be implemented in page sub-class");
    }
    fetchData (params) {
        query(this.getPageName(), params)
            .then(this.setState.bind(this), this.onError);
    }
    componentDidMount () {
        this.fetchData(this.props.params);
    }
    componentWillReceiveProps (nextProps) {
        this.fetchData(nextProps.params);
    }
}
