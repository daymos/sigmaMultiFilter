var _ = require('ramda')

// takes data in 
module.exports =  (data) => {
    var transformation = {
        nodes: data.nodes.forEach(el => {
            el.thisNodeBelongsToTheseCategories = randomArrayOfCategories()
        }) 
    } 
    return _.evolve(transformation, data)
}

function randomArrayOfCategories () {
    return (
            ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7'].map((el, i, arr) => {
                if(i > ~~(Math.random() * arr.length)) {return el} 
            }).filter(el => el != null)
           )
}
