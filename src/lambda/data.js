const data = [{"id":1,"category":"Adventure|Animation|Children|Comedy|Fantasy","price":"$5922.57","stocked":false,"name":"Asterix and the Vikings (Astérix et les Vikings)"},
{"id":2,"category":"Comedy|Drama|War","price":"$8188.44","stocked":true,"name":"Captain Newman, M.D."},
{"id":3,"category":"Action|Adventure|Drama","price":"$3407.46","stocked":true,"name":"Hero (Ying xiong)"},
{"id":4,"category":"Comedy","price":"$2677.64","stocked":false,"name":"Welcome to the Jungle"},
{"id":5,"category":"Comedy","price":"$5098.48","stocked":true,"name":"French Fried Vacation (Les Bronzés)"},
{"id":6,"category":"Action|Comedy|Drama","price":"$2589.17","stocked":false,"name":"Cannonball"},
{"id":7,"category":"Action|Drama|Thriller","price":"$7381.86","stocked":false,"name":"How I Live Now"},
{"id":8,"category":"Documentary","price":"$5130.28","stocked":true,"name":"Roman Polanski: Wanted and Desired"},
{"id":9,"category":"Comedy","price":"$6466.94","stocked":true,"name":"My Favorite Year"},
{"id":10,"category":"Drama","price":"$8806.69","stocked":true,"name":"Crucible, The"},
{"id":11,"category":"Documentary","price":"$5610.43","stocked":true,"name":"First Case, Second Case (Ghazieh-e Shekl-e Aval, Ghazieh-e Shekl-e Dou Wom)"},
{"id":12,"category":"Comedy","price":"$1125.24","stocked":false,"name":"Freshman, The"},
{"id":13,"category":"Comedy|Drama|Thriller","price":"$9784.79","stocked":false,"name":"Girls on the Road (a.k.a. Hot Summer Week)"},
{"id":14,"category":"Horror|Musical","price":"$5692.73","stocked":true,"name":"Devil's Carnival, The"},
{"id":15,"category":"Horror","price":"$7361.65","stocked":false,"name":"Grim Reaper"},
{"id":16,"category":"Comedy|Crime|Romance","price":"$938.56","stocked":true,"name":"Watch Out for the Automobile (Beregis avtomobilya)"},
{"id":17,"category":"Action|Sci-Fi","price":"$6483.26","stocked":true,"name":"2012: Supernova"},
{"id":18,"category":"Drama","price":"$8886.84","stocked":false,"name":"The Learning Tree"},
{"id":19,"category":"Drama","price":"$382.38","stocked":false,"name":"Home for the Holidays"},
{"id":20,"category":"Comedy","price":"$2952.52","stocked":false,"name":"Semi-Pro"},
{"id":21,"category":"Drama","price":"$4288.75","stocked":true,"name":"Head On"},
{"id":22,"category":"Comedy","price":"$4655.30","stocked":true,"name":"Changing Sides (De l'autre côté du lit)"},
{"id":23,"category":"Horror","price":"$4565.25","stocked":false,"name":"Kiss, The"},
{"id":24,"category":"Comedy|Romance","price":"$5881.09","stocked":false,"name":"American Idiots"},
{"id":25,"category":"Drama","price":"$4672.81","stocked":true,"name":"Man in the Gray Flannel Suit, The"},
{"id":26,"category":"Comedy","price":"$7329.93","stocked":true,"name":"Moon Over Parador"},
{"id":27,"category":"Crime|Drama|Thriller","price":"$435.55","stocked":true,"name":"Debt, The (Dlug)"},
{"id":28,"category":"Documentary|Musical","price":"$6238.47","stocked":false,"name":"Phil Ochs: There But for Fortune"},
{"id":29,"category":"Comedy|Drama|Romance","price":"$7493.94","stocked":true,"name":"Nothing Like the Holidays"},
{"id":30,"category":"Documentary","price":"$6868.98","stocked":false,"name":"Budrus"}]
.map(item => {
    item.category = item.category.split('|')[0];
    return item;
})
.sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});

exports.handler = function(event, context, callback) {
    const {filter, onlyStock} = event.queryStringParameters;
    let filteredData;
    
    if (filter || onlyStock) {
        const filterRegex = filter ? new RegExp('^.*(' + filter.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d') + ').*$', 'i') : undefined;

        filteredData = data.filter(item => {
            if (onlyStock && !item.stocked) {
                return false;
            }

            if (filter && !filterRegex.test(item.name)) {
                return false;
            }

            return true;
        });
    } else {
        filteredData = data;
    }
    
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(filteredData)
    })
}