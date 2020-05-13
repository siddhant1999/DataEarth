var node_s;
var edge_s, rel_ed= '', res_ed = '';
var con_lookup = [];
var spec_name, spec_sci_name, spec_img;
var conn_id = [], conn_s1=[], conn_s2=[], conn_type=[], conn_desc=[], conn_pri=[];
var fer = '#' + spec_id;

var allnodes = [];
var species_lookup = [];
var species_img_lookup = [];

var rely_nodes=[];
var rely_subgroup_lookup=[];
var respond_nodes=[];
var respond_subgroup_lookup=[];

var is_address = false;
var isCat=[];
querying();

var address;
function querySpec(sid){
  var temp_name, temp_sci_name, temp_img;
  $.ajax({
    type: "POST",
    url: "scripts/gatherdata.php",
    //async: false,
    data: {
       sqlID: sid
    },
    success: function(result) {
      temp_name = result.data.species[0].Species_Name;
      temp_sci_name= result.data.species[0].Species_Scientific_Name;
      temp_img = result.data.species[0].Species_Image_URL;
      temp_cat = result.data.species[0].Category_ID;

      if (rely_nodes.includes(sid)) {
        rely_subgroup_lookup[sid]= result.data.species[0].Subgroup_ID;
        cy.$('#e_'+sid).css({
          'target-arrow-shape': 'triangle',
          'line-color': '#7ec0ee',
          'target-arrow-color': '#7ec0ee'//blue
        })
      }
      if (respond_nodes.includes(sid)) {
        respond_subgroup_lookup[sid]= result.data.species[0].Subgroup_ID;
        cy.$('#e_'+sid).css({
          'target-arrow-shape': 'triangle',
          'line-color': '#ffff7f',
          'target-arrow-color': '#ffff7f'//yellow
        })
      }
      console.log("looking", temp_name, temp_cat)

      if (temp_cat != null && temp_cat != "null") {
        console.log("found null", sid)
        isCat.push(sid)
        console.log(isCat)
        cy.$('#e_'+sid).css({
          'line-color': 'red',
          'target-arrow-color': 'red'//green
        })
      }

      species_lookup[sid]= temp_name;
      species_img_lookup[sid] = temp_img;

      var fer = '#' + sid;
      //id of the node the center is connected to
      var ind = conn_s2.indexOf(sid); // = -1 if sid is is not in conn_s2
      $("body").css({
          'background-color': 'black'
        });

     /*cy.$('#e_'+sid).css({
        'target-arrow-shape': 'triangle',
        'line-color': 'red',
        'target-arrow-color': 'green'
      })*/

      if (ind != -1) {
        var gg = conn_desc[ind] + '\n' + temp_name;
        //console.log(gg);
        cy.$(fer).css({
          'background-image': temp_img,
          'label': String(gg),//+'_' + sid,
          'border-color': 'green',
          'text-wrap': 'wrap',
          //'color':'red',
          'text-background-opacity': 0,
          //'text-background-shape': 'roundrectangle',
          //'text-background-color': 'green',
          'color': 'white',
          'font-weight': 'bold',
          'text-valign': 'bottom',
        });
      }
      else {
        $("#spec_name_here").text(temp_name);
        var locs = (queryLoc(sid));
        var pp = temp_name// + '\n' + locs;
        cy.$(fer).css({
          /*'height': cy.height()/4,
          'width': cy.height()/4,*/
          'height': 140,
          'width': 140,
          'text-margin-y': -35,
          'background-image': temp_img,
          'text-wrap': 'wrap',
          //'text-background-color': 'blue',
          'label': pp,
          'border-color': 'green',
          'text-valign': 'top',
          //'text-border-color':'blue',
          'color': 'white',
          'font-size': '2.5em',
          'font-weight': 'bold',
          'font-style': 'italic',
          'text-background-opacity': 0
          //'text-background-shape': 'roundrectangle'
        });


      }
    }
  });
}

function querying(){
  //console.log(spec_id);
    $.ajax({
      type: "POST",
      url: "scripts/gatherdata.php",
      async: false,
      data: {
         sqlID: spec_id
      },
      success: function(result) {
          node_s = '[';
          edge_s = '[';

          spec_name = result.data.species[0].Species_Name;
          spec_sci_name= result.data.species[0].Species_Scientific_Name;
          spec_img = result.data.species[0].Species_Image_URL;
          spec_desc = result.data.species[0].Species_Desc;
          spec_low = result.data.species[0].Species_Low_Weight;
          spec_high = result.data.species[0].Species_High_Weight;
          spec_units = result.data.species[0].Species_Weight_Units;
          spec_subgroup = result.data.species[0].Subgroup_ID;
          spec_category = result.data.species[0].Category_ID;

          var str = '{ "data": {"id": "'+ spec_id +'"} }';
          //str.toString();
          //str = JSON.stringify(str);
          //node_s.push(str);
          node_s += str;
          allnodes.push(spec_id);
          //the first thing

          //str += "<h4>Parent ID: " + result.data.species[0].Parent_ID + "</h4>";
          c =0;
          var isconn = 0;
          rely_s = '[';
          for (var i = 0; i < result.data.connections.length; i++) {
              c+=1;
              //these are all the connections that exist
              isconn = 1;
              conn_id.push(result.data.connections[i].Connection_ID);
              conn_s1.push(result.data.connections[i].Species_1_ID);
              conn_s2.push(result.data.connections[i].Species_2_ID);
              con_lookup[result.data.connections[i].Species_2_ID] = result.data.connections[i].Connection_Desc;
              str = ', { "data": {"id": "'+ result.data.connections[i].Species_2_ID +'"} }';
              //querySpec(result.data.connections[i].Species_2_ID);
              //var fer = '#' + result.data.connections[i].Species_2_ID;
              //^^ now that you have the species id of the connection node you need to query all of it's information
              allnodes.push(result.data.connections[i].Species_2_ID);
              //node_s.push(str);
              node_s += str;
              var estr ='';
              //var estr = '{ "data": { "source": "'+ spec_id +'", "target": "'+ result.data.connections[i].Species_2_ID +'" } },';
              //edge_s.push(estr);
              //edge_s += estr;
              conn_type.push(result.data.connections[i].Connection_Type);
              conn_desc.push(result.data.connections[i].Connection_Desc);
              conn_pri.push(result.data.connections[i].Connection_Priority);

              if (result.data.connections[i].Connection_Type == 'Rely' ) {
                rely_nodes.push(result.data.connections[i].Species_2_ID);
                rel_ed += '{ "data": { "id": "e_'+result.data.connections[i].Species_2_ID+'", "source": "'+ result.data.connections[i].Species_2_ID +'", "target": "'+ spec_id +'" } },';
                //if (c>9) {break}
              }
              else if (result.data.connections[i].Connection_Type == 'Respond' ) {
                respond_nodes.push(result.data.connections[i].Species_2_ID);
                res_ed += '{ "data": { "id": "e_'+result.data.connections[i].Species_2_ID+'", "source": "'+ spec_id +'", "target": "'+ result.data.connections[i].Species_2_ID +'" } },';
              }
              else {
                alert(result.data.connections[i].Connection_Type)
              }

          }
          node_s += ']';
          node_s = JSON.parse(node_s);
          //remove last character from string
          if(isconn){
            edge_s ='[' + res_ed + rel_ed;
            edge_s = edge_s.substring(0, edge_s.length - 1);
            console.log(edge_s);
            //rely_s = rely_s.substring(0, rely_s.length - 1);
          }
          edge_s += ']';
          
          edge_s = JSON.parse(edge_s);
          //rely_s = JSON.parse(rely_s);
          console.log(edge_s);
          //console.log(edge_s);
          //console.log(rely_s);
          //console.log(spec_id + " " + spec_name + " " + spec_sci_name + " " + spec_img);
          //for (var i = 0; i < conn_id.length; i++) {
            //console.log(conn_id[i] + " " + conn_s1[i] + " " + conn_s2[i] + " " + conn_type[i] + " " + conn_desc[i] + " " + conn_pri[i]);
          //}
          //console.log(node_s);
          //console.log(edge_s);
          //console.log(allnodes);
      }
    });
}
var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: false,
  autounselectify: true,
  zoom: 1,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 80,
        'width': 80,
        'background-fit': 'cover',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5,
        'text-background-opacity': 0
        //'text-border-color':'blue',
        //'text-background-color': 'blue',
        //'text-background-shape': 'roundrectangle'

      })
    .selector('edge')
      .css({
        'width': 6,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle'
      }),

    elements: {
      nodes: node_s,
      edges: edge_s
    },

    layout: {
      name: 'concentric',
      //directed: false,
      spacingFactor: 1.75,
      padding: 100,
      startAngle: 13/7 * Math.PI,
      sweep: 9/7 * Math.PI
    }
  });
for (var i = 0; i < allnodes.length; i++) {
  querySpec(allnodes[i]);
}

cy.userPanningEnabled( false );
cy.zoomingEnabled( false );
cy.boxSelectionEnabled( false );
cy.autolock( true );



/*function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}

function map_loc(theid){
  var tempstr = '<div id="map"></div>';
  $('#map_1').append(tempstr);
  initMap();
}
*/

//location
// query all of the information from the location_species (table) from there query from location (knowing that the infomration will be there )
//once that information is already there you can determine the location information from Location (table)

// location information

cy.on('tap', 'node', function(evt){
  var node = evt.target;
  if (node.id() == spec_id) {

    //$('body').empty();
    //$('body').append('<div id="mas" class="container"></div>');
    //$('#mas').append('<div id="r1" class="row"></div>');
    //var ssr ='<div id="con_1" class="col-sm-3"></div><div id="con_2" class="col-sm-3"></div><div id="map_1" class="col-sm-6"></div><div id="loc_info"></div>';
    //$('#r1').append(ssr);

    sessionStorage.setItem('con_lookup', con_lookup);
    sessionStorage.setItem('conn_id', conn_id);
    sessionStorage.setItem('conn_s1', conn_s1);
    sessionStorage.setItem('conn_s2', conn_s2);
    sessionStorage.setItem('conn_type', conn_type);
    sessionStorage.setItem('conn_desc', conn_desc);
    sessionStorage.setItem('conn_pri', conn_pri);

    sessionStorage.setItem('allnodes', allnodes);
    sessionStorage.setItem('species_lookup', species_lookup);
    sessionStorage.setItem('species_img_lookup', species_img_lookup);
    sessionStorage.setItem('rely_nodes', rely_nodes);
    sessionStorage.setItem('rely_subgroup_lookup', rely_subgroup_lookup);
    sessionStorage.setItem('respond_nodes', respond_nodes);
    sessionStorage.setItem('respond_subgroup_lookup', respond_subgroup_lookup);

    sessionStorage.setItem('spec_name', spec_name);
    sessionStorage.setItem('spec_sci_name', spec_sci_name);
    sessionStorage.setItem('spec_img', spec_img);

    sessionStorage.setItem('spec_desc', spec_desc);
    sessionStorage.setItem('spec_low', spec_low);
    sessionStorage.setItem('spec_high', spec_high);
    sessionStorage.setItem('spec_units', spec_units);
    sessionStorage.setItem('spec_subgroup', spec_subgroup);
    sessionStorage.setItem('spec_category', spec_category);

    //console.log(species_lookup);
    //species_img_lookup = JSON.parse(species_img_lookup);
    //console.log(species_img_lookup);
    //console.log("rely_nodes: " + rely_nodes);
    window.location.assign("http://dataearth.com/info.php?id=" + String(node.id()));
    //onresize();
    //infopage(spec_id);
    //queryLoc(spec_id);
    //before doing initmap query the location data and then init
    initMap();
    loc_init();

  }
  else if (isCat.indexOf(node.id()) != -1) {
    window.location.assign("http://dataearth.com/demo.php?id=" + String(node.id()));
    window.open("http://dataearth.com/info.php?id=" + String(node.id()));
  }
  else {
    window.location.assign("http://dataearth.com/demo.php?id=" + String(node.id()));
  }
});
//here is where all the code was removed from

//window.addEventListener("resize", cy.resize()); //does not work
/*
var node_s = [
      { data: { id: 'cat' } },
      { data: { id: 'bird' } },
      { data: { id: 'ladybug' } },
      { data: { id: 'aphid' } },
      { data: { id: 'rose' } },
      { data: { id: 'grasshopper' } },
      { data: { id: 'plant' } },
      { data: { id: 'wheat' } }
    ];

var edge_s =  [
      { data: { source: 'cat', target: 'bird' } },
      { data: { source: 'cat', target: 'ladybug' } },
      { data: { source: 'cat', target: 'grasshopper' } },
      { data: { source: 'cat', target: 'plant' } },
      { data: { source: 'cat', target: 'wheat' } },
      { data: { source: 'cat', target: 'aphid' } },
      { data: { source: 'cat', target: 'rose' } }
    ];
*/
      /*
    .selector('#bird')
      .css({
        'background-image': str
      })

    .selector('#cat')
      .css({
        'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg',
        'label': 'Cat'
      })
    .selector('#ladybug')
      .css({
        'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
  .selector('#aphid')
      .css({
        'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
      })
  .selector('#rose')
      .css({
        'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
      })
  .selector('#grasshopper')
      .css({
        'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
      })
  .selector('#plant')
      .css({
        'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
      })
  .selector('#wheat')
      .css({
        'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
      }),
*/



//var conn_id = [], conn_s1=[], conn_s2=[], conn_type=[], conn_desc=[], conn_pri=[];
/*for (var i = 0; i < conn_id.length; i++) {
  var prim = "#" + conn_s2[i];
  cy.$(prim).css({
    //'label': conn_desc[i]
  });
}*/


// cy init

/*cy.$(fer).css({
        'background-image': str
      });
*/
//cy.$('#bird').style.background-color = "blue";

//cy.$('#bird').remove();
/*style: cytoscape.stylesheet().cy.selector('#ladybug').css({
        'border-color': 'blue'
      })
*/
/*cy.$('#bird').style()
  .fromString('node {background-color: blue;}')
  .update()
  ;
  */

/*var eles = cy.add([
  { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
  { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
  { group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
]);

cy.$('#n0').css({
        'background-image': str
      });
*/
/*


cy.on('tap', 'node', function(){
  var nodes = this;
  var tapped = nodes;
  var food = [];

  //nodes.addClass('eater');

  for(;;){
    var connectedEdges = nodes.connectedEdges(function(el){
      return !el.target().anySame( nodes );
    });

    var connectedNodes = connectedEdges.targets();

    Array.prototype.push.apply( food, connectedNodes );

    nodes = connectedNodes;

    if( nodes.empty() ){ break; }
  }

  var delay = 0;
  var duration = 500;
  for( var i = food.length - 1; i >= 0; i-- ){ (function(){
    var thisFood = food[i];
    var eater = thisFood.connectedEdges(function(el){
      return el.target().same(thisFood);
    }).source();

    thisFood.delay( delay, function(){
      eater.addClass('eating');
    } ).animate({
      position: eater.position(),
      css: {
        'width': 10,
        'height': 10,
        'border-width': 0,
        'opacity': 0
      }
    }, {
      duration: duration,
      complete: function(){
        thisFood.remove();
      }
    });

    delay += duration;
  })(); } // for

}); // on tap
*/
