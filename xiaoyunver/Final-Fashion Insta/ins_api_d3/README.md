# Assignment 2-X [Optional]: Practicing with `d3.nest()`

`d3.nest()` shares many conceptual similarities with crossfilter grouping options. Both can create sub-groups from a flat array based on some similarity criteria; both return a `{key:..., values:...}` structure. At the same time, there are many implementation differences. Some of these include:

1. `d3.nest()` returns a reusable function, and this reusable function can be run on any array. `crossfilter.dimension.group` is a method of a *specific* crossfilter/dataset, and can only be used to group that dataset.
2. `crossfilter.dimension.group` by default reduces groups to a single value; `d3.nest()` don't. However, `d3.nest()` can also be made to reduce, with the `d3.nest().rollup()` method.

## Step 1: basic `d3.nest()`

Nest (i.e. group) all trips into subgroups that share the same starting station. Call `d3.nest().entries()`, and log the result.

## Step 2: basic `d3.nest()`, but map the result

Do the same thing as step 1, but use `.map()` instead of `.entries()`. It should look something like this:
```
var tripsByStartStation = d3.nest()
  ...
  .map(allTrips, d3.map)
```
Log the result, and compare with step 1. What do you see?

## Step 3: Two level nest

Nest all trips by start station, and under each subgroup by station, nest further by casual vs. registered users. Note that trips by casual users don't have any age, gender or zipcode information, so you can use this fact to add a casual/registered flag variable during parse.

Note that crossfilter groups can't easily do this.

## Step 4: Two level nest + reduce

What if I want to find out this: what is the percentage of casual vs. registered trips at each station?

We can start from step 3, and add one additional method to the nest function: `.rollup()`. As the name implies, this reduces (i.e. "rolls up") "leaves" in the nested structure into a single value. Consult the API doc.

## Step 5: Nest, but only for 2012 

Back to start: I want to nest trips by start station, but only for 2012. Without using crossfilter group, this is a two step process. First you need to `array.filter()` all trips, then you can nest the subset of trips.

## Step 6: Group, but only for 2012

Do the same thing as step 5, but by creating a crossfilter.

What you want to do in step 5 is much more easily accomplished with crossfilter. Hint: you can have two dimensions on the crossfilter: "startStation" and "time". By applying an active filter on "time", any grouping you do on the "startStation" dimension also respects the "time" filter.

