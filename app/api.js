const axios = require('axios');
var urls = [];
var objects = [];
axios({
    type: "GET",
    url: "https://www.dnd5eapi.co/api/monsters/",
    dataType: "json",
    async: true,
    success: function(data) {
        data.results.forEach(element => {
            urls.push(element.url)
        })
        return data

    }
})

// urls.forEach(element => {
//     objects.push(getMonster(element))
// })
// console.log(objects[0])

// })

getMonster = (url) => {
    axios({
        type: "GET",
        url: "https://www.dnd5eapi.co" + url,
        dataType: "json",
        async: false,
        success: function(data) {
            return data
        }
    })


}