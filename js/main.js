/*Stylesheet by Timothy Prestby 2019*/

//execute script when window is loaded
window.onload = function(){

    var w = 900, h = 500;
    var container = d3.select("body") //get the <body> element from the DOM
    //return it to container variable
        .append("svg") //put a new svg in the body
        //Changes selection to SVG
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") 
        //always assign a class (as the block name) for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block!

    //Only place a semicolon at the end of the block 
    //innerRect block
    var innerRect = container.append("rect") //put a new rect in the svg (what is still selected)
        .datum(400) //Bind data value to the selection
        //Using the anonymous function allows the parameter to be accessed
        .attr('width', function(d){ //rectangle width
            return d * 2; //400 * 2 = 800
        }) 
        .attr('height', function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color

        var cityPop = [
            { 
                city: 'Gary',
                population: 76008
            },
            {
                city: 'Las Vegas',
                population: 641676
            },
            {
                city: 'Orlando',
                population: 280257
            },
            {
                city: 'Denver',
                population: 704621
            }
        ];
        //Find the min popuation of the array
        var minPop = d3.min(cityPop, function(d){
            return d.population;
        });
    
        //find the maximum value of the array
        var maxPop = d3.max(cityPop, function(d){
            return d.population;
        });
        var x = d3.scaleLinear() //create the scale as a generator
            .range([90, 700]) //output min and max
            .domain([0, 3]); //input min and max
        //scale for circles center y coordinate
        var y = d3.scaleLinear()
            .range([450, 50])
            .domain([0,900000]);
        
        var color = d3.scaleLinear()
            .range([
                "#00FFFF",
                "#0000FF"
            ])
            .domain([
                minPop, 
                maxPop
            ]);
   
        var circles = container.selectAll(".circles") //but wait--there are no circles yet!
            .data(cityPop) //here we feed in an array
            .enter() //one of the great mysteries of the universe
            .append("circle") //add a circle for each datum (5 circles)
            .attr("class", "circles") //apply a class name to all circles
            .attr("id", function(d){ //circle name
                return d.city;
            })
            .attr("r", function(d){
                //calculate the radius based on population value as circle area
                //referenced using the property population
                var area = d.population * 0.01;
                return Math.sqrt(area/Math.PI);
            })
            .attr("cx", function(d, i){
                //use the scale generator with the index to place each circle horizontally
                return x(i);
            })
           //Example 2.8 line 38
            .attr("cy", function(d){
                return y(d.population);
            })

            .style("fill", function(d, i){ //add a fill based on the color scale generator
                return color(d.population);
            })
            .style("stroke", "#000"); //black circle stroke

            var yAxis = d3.axisLeft(y);
            //create new left axis variable using our scale generator
            var axis = container.append("g")
            //Add the group element to the container
            .attr("class", "axis")
            //Naming the class axis
            .attr("transform", "translate(50, 0)")
            yAxis(axis);

            //below Example 3.9...create a text element and add the title
            var title = container.append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("x", 450)
            .attr("y", 30)
            .text("City Populations");

            //create format generator
            var format = d3.format(",");

            //below Example 3.12...create circle labels
            var labels = container.selectAll(".labels")
                .data(cityPop)
                .enter()
                .append("text")
                .attr("class", "labels")
                .attr("text-anchor", "left")
                .attr("y", function(d){
                    //vertical position centered on each circle
                    return y(d.population);
                });

            //First line of label
            var nameLine= labels.append("tspan")
                .attr("class", "nameLine")
                .attr("x", function(d,i){
                    //Get horizontal position
                    return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
                })
                .text(function(d){
                    return d.city;
                });

            //second line of label
            var popLine = labels.append("tspan")
                .attr("class", "popLine")
                .attr("x", function(d,i){
                    //horizontal position to the right of each circle
                    return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
                })
                .attr("dy", "15") //vertical offset
                .text(function(d){
                    return "Pop. " + format(d.population);
                });




    };



