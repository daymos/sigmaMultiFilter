var s = new sigma('graph-container')

var fetchedData = null;
var currentData = null;

var buildUrl = (url, param = 0) => `${url}?degree=${param}`

// applies one filter
var filterBycategory = (obj, param) => {
    return new Promise((resolve, reject) => {
        if (param === 'all') resolve(obj)

        var filteredNodes = obj.nodes.filter(el => {
            return el.thisNodeBelongsToTheseCategories.indexOf(param) > -1
        });
        var discardedNodesIds = obj.nodes.filter(el => el.thisNodeBelongsToTheseCategories.indexOf(param) === -1).map(el => el.id);
        var filteredEdges = obj.edges.filter(el => {
            return discardedNodesIds.indexOf(el.target) === -1 & discardedNodesIds.indexOf(el.source) === -1 
        });
        currentData =  { edges: filteredEdges, nodes: filteredNodes };
        resolve({ edges: filteredEdges, nodes: filteredNodes })
    })
}


// fetch data and parse it
var fetchData = e => {
    var url = (e === undefined) ? buildUrl(server, 0) : buildUrl(server, e.target.value);
    return fetch(url)              // makes request to server
        .then(data => data.json())  // parses the json
        .then(data => { console.log(data); return data }) //log response
        .then(data => { fetchedData = data; currentData = null; return data }) //store fetched data for the filters

};

// updat global sigmaJS instance
var render = (data) => { 
    s.graph.clear();
    s.graph.read(data);
    s.refresh();
    s.refresh();
};

// init filter pane
var clearFilter = () => {
    currentData = null;
    $('#filterContainer').empty()
}

//
//event listeners
//

$('document').ready(() => {
    fetchData()
        .then(render)
})


$('#min-degree').change((e) => {
    $('#min-degree-val')[0].textContent = e.target.value
    clearFilter()
    fetchData(e)
        .then(render)
})

// individual filter controller
$('#addFilter').click(e => {
    $('#filterContainer').append(`<div><span><select></select></span>`);  
    arrayOfCategories.forEach((el, i) => {
        if(!i) $('select').last().append(`<option selected value='all'>All categories</option>`)
            $('select').last().append(`<option value=${el}>${el}</option>`)
                $('select').last().change(e => {
                    if($('select').length === 1){
                        filterBycategory(fetchedData, e.target.value)
                            .then(render)
                    } else{  
                        filterBycategory(currentData || fetchedData, e.target.value)
                            .then(render)
                    }
                })
    })
})


$('#reset-btn').click( ()=> {
    clearFilter()
    render(fetchedData)
})

var dragListener = sigma.plugins.dragNodes(s, s.renderers[0])
