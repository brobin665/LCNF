//Brian Robinson Geog 777 6/2017 Capstone in Geography

function createMap(){
	var map = L.map('map').setView([46.993030,-111.050566],8);
	 L.tileLayer('https://api.mapbox.com/styles/v1/brobin665/cj4wewtkb1unv2rqfn89v80k7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJvYmluNjY1IiwiYSI6ImNpc2p1MXkzZzAybWgydnB1NWVvY2llOGkifQ.ufsYZx_ojLbkU4JSpgzH5g', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery   <a href="http://mapbox.com">Mapbox</a>',
	}).addTo(map);
	
	var boundaries,
		streams,
		waterbodies,
		rec_sites,
		fire_pts,
		fire_area,
		trails,
		roads;
		
	var sublayers =[];
	
	 L.control.locate({
		 keepCurrentZoomLevel: 'true'
	 }).addTo(map);
	
	L.easyButton('fa-home', function(btn, map){
    map.setView([46.993030,-111.050566],8);
	}).addTo(map);
	

	cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
     		sql: 'SELECT * FROM boundary',
     		cartocss: '#layer { polygon-fill: #BAE888; polygon-opacity: 0.3; line-color: #008000; }'
    		},
		]
	}).addTo(map)
	  .done(function(layer){
		boundaries =layer;
		
		//Create search bar
		var search = cdb.vis.Overlay.create('search', map.viz, {});
            search.show();
            $('#map').append(search.render().el);
		
		
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
			sql: 'SELECT * FROM waterbody',
			cartocss: '#layer {polygon-fill: #c3f4ed; polygon-opacity:0.4; line-color:#3A5FFF;}'
		},
		]
		}).done(function(layer){
						  
				waterbodies=layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['waterbody_', 'shape_area'],{infowindowTemplate: $('#infowindow_waterbodies').html(),templateType: 'mustache'});
				
			
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
			sql: 'SELECT * FROM streamroute',
			cartocss: '#layer { line-color: #3A5FFF; line-width: 0.75; line-opacity: 1;}'
			},
		]
		}).done(function(layer){
						  
				streams=layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['lc_name', 'shape_leng'],{infowindowTemplate: $('#infowindow_streams').html(),templateType: 'mustache'});
			
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
			sql: 'SELECT * FROM recsites',
			cartocss: '#layer { marker-width: 6; marker-fill: #FFF;marker-fill-opacity: 0.9;marker-allow-overlap: false;marker-line-width: 1; marker-line-color: #000;marker-line-opacity: 1;}'
		}
		]
		}).done(function(layer){
						  
				rec_sites=layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['type', 'name'],{infowindowTemplate: $('#infowindow_recsites').html(),templateType: 'mustache'});
			
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
			sql: 'SELECT * FROM fire',
			cartocss: '#layer { marker-width: 6; marker-fill: #FF8610;marker-fill-opacity: 0.9;marker-allow-overlap: false;marker-line-width: 1; marker-line-color: #FF1B03;marker-line-opacity: 1;}'	
		}
		]
		}).done(function(layer){
						  
				fire_pts=layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['fire_name', 'fire_day', 'fire_month', 'fire_year'],{infowindowTemplate: $('#infowindow_fire_pts').html(),templateType: 'mustache'});
		
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
			sql: 'SELECT * FROM trail_system',
			cartocss: '#layer \ [zoom <= 11] { line-color: #804000; line-width: 1; line-opacity: 1;}\ [zoom >=12] { line-color: #804000; line-width: 1; line-opacity: 1;}'
		},
		]
		}).done(function(layer){
						  
				trails =layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['name', 'seg_length', 'begin_term', 'end_termin'],{infowindowTemplate: $('#infowindow_trails').html(),templateType: 'mustache'});
			
			
			
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
			{
			sql: 'SELECT * FROM fire_his_area',
     		cartocss: '#layer { polygon-fill: #FF8610; polygon-opacity: 0.3; line-color: #FF1B03; }'
		}
		]
		}).done(function(layer){
						  
				fire_area =layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['fire_name', 'fire_day', 'fire_month', 'fire_year', 'shape_area'],{infowindowTemplate: $('#infowindow_fire_area').html(),templateType: 'mustache'});
		
		cartodb.createLayer(map, {
		user_name: 'bdrobinson2',
		type: 'cartodb',
		sublayers:[
		{
			sql: 'SELECT * FROM roadsystems',
			cartocss: '#layer { line-color: #000; line-width: 1; line-opacity: 1;}'
		}
		]
		}).done(function(layer){
						  
				roads =layer;
				var sublayer = layer.getSubLayer(0);
				cartodb.vis.Vis.addInfowindow(map, sublayer, ['name','shape_leng'],{infowindowTemplate: $('#infowindow_roads').html(),templateType: 'mustache'});
			
			
			
		//draw controls
		var drawnItems = new L.FeatureGroup();
			
		var drawControl = new L.Control.Draw({
			position: 'topleft',
			draw:{
			 polyline: false,
            polygon: false,
            circle: false,
            rectangle: false,
            marker: true
			},
			edit: {
				featureGroup:drawnItems,
				remove: true
			}								
											
		});
			map.addControl(drawControl);
			
			var sql = new cartodb.SQL({user: 'bdrobinson2', format: 'GeoJSON'});
			sql.execute("SELECT * FROM lcnf_user_data")
			.done(function(data){
				geojsonLayer =L.geoJson(data, {
					onEachFeature: function (feature, layer){
						layer.cartodb_id =feature.properties.cartodb_id;
						
						drawnItems.addLayer(layer);
					}
				});
				map.addLayer(drawnItems);
				
			})
			.error(function(errors){
				console.log("errors: " + errors);
			});
			
			function persistOnCartoDB(action, layers){
				//This function interacts with the security definer function in our carto account
				
				var cartodb_ids= [],
						geojsons =[];
				 		
				//console.log(action + "persistOnCartoDB");
				
				
				switch(action){
					case "UPDATE":
						//console.log(layers.getLayers().length);
						if(layers.getLayers().length<1){ return;
													   }
						layers.eachLayer(function(layer){
							cartodb_ids.push(layer.cartodb_id);
							geojsons.push("'"+JSON.stringify(layer.toGeoJSON().geometry)+ "'");
					
						});
					break;
					
					case "INSERT":
						cartodb_ids.push(-1);
						 //console.log("here is the geojsons");
						//console.log(geojsons);
          				//console.log("'" + JSON.stringify(layers.toGeoJSON().geometry) + "'");
						
						geojsons.push("'" + JSON.stringify(layers.toGeoJSON().geometry)+ "'");
		
						
					break;
					
					case "DELETE":
						
						layers.eachLayer(function(layer){
							cartodb_ids.push(layer.cartodb_id);
							geojsons.push("''");
							
							
						});
					break;
				}
				// construct the SQL Statement
				
				var sql ="SELECT lcnf_user_data(ARRAY[";
				sql += cartodb_ids.join(",");
				sql+= "], ARRAY[";
				sql+= geojsons.join(",");
				sql += "]);";
				
				//console.log("persisting... " + sql); 
				
				//Post the sql to carto
				
				$.ajax({
					type: 'POST',
					url: 'https://bdrobinson2.carto.com/api/v2/sql',
					crossDomain: true,
					data: {
						"q": sql
					},
					dataType: 'json',
					success: function(responseData, textStatus, jqXHR){
						console.log("Data saved");
						
						if (action == "INSERT"){
							layers.cartodb_id =responseData.rows[0].cartodb_id;
						}
					},
					error: function(responseData, textStatus, errorThrown){
						console.log("Problem saving the data "+ responseData);
					}
				});
			}
			
			//bind drawing events to fire the persistOnCartoDB() function
			
			map.on('draw:created', function(e){
				//console.log("draw:created fired");
				var layers =e.layer;
				drawnItems.addLayer(layers);
				//console.log(e);
				persistOnCartoDB("INSERT", layers);
				//console.log("draw:created:insert persistOnCartoDB fired");
				
				
			});
			
			map.on('draw:edited', function(e){
				var layers =e.layers;
				persistOnCartoDB("UPDATE", layers);
				//console.log("draw:created:update persistOnCartoDB fired");
			});
			
			map.on('draw:deleted', function(e){
				var layers =e.layers;
				persistOnCartoDB("DELETE", layers);
				//console.log("draw:created:delete persistOnCartoDB fired");
			});
			
			//add sublayers to layergroup
			var overlayMaps ={
				"Boundaries": boundaries,
				"Waterbodies": waterbodies,
				"Streams":streams,
				"Roads":roads,
				"Trails":trails,
				"Recreational Sites": rec_sites,
				"Historical Start Points of Fires": fire_pts,
				"Historical Perimeter of Fires": fire_area,
				"User Created Data" :drawnItems,
			};
					
			L.control.layers(null, overlayMaps).addTo(map);
			
		});
		});
		});
		});
		});
		});	
		});
	});
	
}

$(document).ready(createMap);