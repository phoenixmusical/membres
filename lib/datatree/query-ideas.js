
function createQuery(definition) {
    function Query(params) {
        this.params = params;
    }
    Query.prototype = definition;
    return Query;
}

function createElement(Query, params) {
    var element = new Query(params);
}

var ComityEventsList = createQuery({
    render: function (params) {
        var comityID = this.params.comity;
        return createElement(PromiseObject, ;
    }
});

var ComityItem = createQuery({
    render: function () {
        var comity = this.params.comity;
        return {
            id: comity.id,
            name: comity.name,
            events: createElement(ComityEventsList, {comity: comity.id})
        };
    }
});

var ComitiesList = createQuery({
    render: function () {
        return createElement(PromiseMap, {promise: Comity.find().exec()}, function (comity) {
            return createElement(ComityItem, {comity: comity});
        });
    }
});

var HomePage = createQuery({
    render: function () {
        return {
            comities: createElement(ComitiesList, {})
        };
    }
});

function renderQuery(element) {
    return function (context) {
        
    };
}

var homePageQuery = renderQuery(createElement(HomePage, {}));

socket.expose('home', function (params) {
    var context = {
        user: this.request.user
    };
    return homePageQuery(context);
});
