    require([
      "esri/config",
      "esri/Map",
      "esri/Basemap",
      "esri/widgets/BasemapToggle",
      "esri/views/SceneView",
      "esri/widgets/Search",
      "esri/widgets/Home",

      "dojo/dom",
      "dojo/on",
      "dojo/domReady!"
    ], function(esriConfig, Map,
      Basemap, BasemapToggle, SceneView, Search, Home, dom, on 
    ) {


      var topomap = new Map({
        basemap: "topo",
        ground: "world-elevation"
      });

      var hybridmap = new Map({
        basemap: "hybrid",
        ground: "world-elevation"
      });

      var initCamera = {
        heading: 0,
        tilt: 0,
        position: {
          latitude: 39.773951,
          longitude: -86.167492,
          z: 5000
        }
      };

      var view = new SceneView({
        container: "viewDiv",
        map: topomap,
        camera: initCamera,
        // The secondary (Stamen) basemap only covers the contiguous USA.
        // Set constraints to make the user unlikely to go to unsupported locations
        constraints: {
          altitude: {
            max: 25000000
          }
        }
      });

      var searchWidget = new Search({
          view: view
        });
        searchWidget.startup();

        // Add the search widget to the top left corner of the view
        view.ui.add(searchWidget, {
          position: "top-left",
          index: 0
      });

      // Add a basemap toggle widget to toggle to the custom basemap
      var toggle = new BasemapToggle({
        titleVisible: false,
        view: view,
        nextBasemap: "hybrid"
      }, "basemapToggleDiv");
      toggle.startup();

      var homeBtn = new Home({
        view: view
      });
      homeBtn.startup();

      // Add the home widget to the top left corner of the view
      view.ui.add(homeBtn, "top-left");



      // Register events to control
      var rotateAntiClockwiseSpan = dom.byId("rotateAntiClockwiseSpan");
      var rotateClockwiseSpan = dom.byId("rotateClockwiseSpan");
      var indicatorSpan = dom.byId("indicatorSpan");
      on(rotateClockwiseSpan, "click", function() {
        rotateView(-1);
      });
      on(rotateAntiClockwiseSpan, "click", function() {
        rotateView(1);
      });
      on(indicatorSpan, "click", tiltView);

      // Watch the change on view.camera
      view.watch("camera", updateIndicator);

      // Create the event's callback functions
      function rotateView(direction) {
        var heading = view.camera.heading;

        // Set the heading of the view to the closest multiple of 90 degrees,
        // depending on the direction of rotation
        if (direction > 0) {
          heading = Math.floor((heading + 1e-3) / 90) * 90 + 90;
        } else {
          heading = Math.ceil((heading - 1e-3) / 90) * 90 - 90;
        }

        view.goTo({
          heading: heading
        });
      }

      function tiltView() {
        // Get the camera tilt and add a small number for numerical inaccuracies
        var tilt = view.camera.tilt + 1e-3;

        // Switch between 3 levels of tilt
        if (tilt >= 80) {
          tilt = 0;
        } else if (tilt >= 40) {
          tilt = 80;
        } else {
          tilt = 40;
        }

        view.goTo({
          tilt: tilt
        });
      }

      function updateIndicator(camera) {
        var tilt = camera.tilt;
        var heading = camera.heading;

        // Update the indicator to reflect the current tilt/heading using
        // css transforms.
        var transform = "rotateX(" + 0.8 * tilt +
          "deg) rotateY(0) rotateZ(" + -heading + "deg)";

        indicatorSpan.style["transform"] = transform;
        indicatorSpan.style["-webkit-transform"] = transform; // Solution for Safari
      }


    });