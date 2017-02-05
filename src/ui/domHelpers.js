// dom helpers

// populate category select with  options
var domAddOptions = (obj, target) => {
    Object.keys(obj.nodes[0]).forEach((el, i) => {
        $(target).append(`<option value=${i}>${el}</option>`)
    })
} 

// add new category filter

