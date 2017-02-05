var server = 'http://localhost:3000/data';
var s = new sigma('graph-container')

var fetchedData = null;
var currentData = null;

var arrayOfCategories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7'] 

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

//get available categories from fetched data



// fetch data and parse it
var fetchData = e => {
    var url = (e === undefined)? buildUrl(server, 0) : buildUrl(server, e.target.value);
    return fetch(url)              // makes request to server
        .then(data => data.json())  // parses the json
        .then(data => {console.log(data); return data})
        .then(data => {fetchedData = data; currentData = null; return data}) //store current data

};

// updates global sigmaJS instance
var render = (data) => { 
    s.graph.clear();
    s.graph.read(data);
    s.refresh();
    s.refresh();
};

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

