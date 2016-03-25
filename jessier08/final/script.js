//Chicago Daily Plate

queue()
    .defer(d3.csv,'data/chicago_fp.csv', parse)
    .await(dataLoaded)


function dataLoaded(err,posts){
    
    console.log(posts);
    
//    var tagStrings = [];
//    
//    var count = posts.length;
//    
//    var counts = [];
//    
//    for (var i=0; i<count; i++){
//        var tags = posts[i];
//        
//    }
//    
//    for (tags in tagStrings){
//        arr.push({
//            text: d.imgTags,
//            frequency: counts[tags];
//        })
//    }
//    
//    return arr.sort(function(a,b){
//        return (a.frequency > b.frequency) ? -1 : ((a.frequency< b.frequency) ? 1 : 0);
//    })
    

    //how do i merge the arrays???
}

function parse(d){
    
    
    return{
        imgTags: (d.food_ltl_1).replace(/"/g,'').split(", "),
        userTags: [d.tags_str],
        weekday: d.weekday,
        hour: d.hour,
        timestamp: +d.timestamp,
        likes: +d.likes_coun,
        comments: +d.comments_c,
        url: d.imageURL
    }
}