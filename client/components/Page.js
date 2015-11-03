import BaseComponent from './BaseComponent';
import {query} from '../datatree';
import {sendAction} from '../actions';

export default class Page extends BaseComponent {
    constructor (props) {
        super(props);
        this.onError = this.onError.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }
    onError (error) {
        console.error(error);
    }
    getPageName () {
        throw new Error("getPageName() needs to be implemented in page sub-class");
    }
    action (method, params) {
        return sendAction(method, params);
    }
    refreshPage () {
        this.fetchData(this.props.params);
    }
    receiveData (data) {
        this.setState(data);
    }
    fetchData (params) {
        query(this.getPageName(), params)
            .then(this.receiveData.bind(this), this.onError);
    }
    componentDidMount () {
        this.fetchData(this.props.params);
    }
    componentWillReceiveProps (nextProps) {
        this.fetchData(nextProps.params);
    }
}
