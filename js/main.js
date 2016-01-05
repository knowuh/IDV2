(function() {

  var formatDay = function(selection) {
    selection
      .append("span").attr("class", "date")
        .text(function(d) { return d.date;})
      .append("span").attr("class", "title")
        .text(function(d) { return d.title;})
      .append("span").attr("class", "description")
        .text(function(d) { return d.description;});
  };

  var makeLinks=function(dataLinks) {
    // var ul = $("#content").append("<ul>");
    d3.select("#schedule").selectAll("li")
      .data(dataLinks)
      .enter()
        .append("li")
        .attr("class", "day")
        .call(formatDay);
    console.log("links made");
    console.log(dataLinks);
  };


  $(document).ready(function() {
    var data = $.getJSON("data/class-weeks.json", makeLinks);
    makeLinks(data);
  });

})();
