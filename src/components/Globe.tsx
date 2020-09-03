import * as React from "react";
import planetaryjs from "planetary.js";
import { GroundPosition } from "../lib/Satellite";
const { useLayoutEffect, useRef } = React;

type GlobeProps = {
  ping: GroundPosition;
};
type GlobeState = {};

const globeStyle = { width: "400px", height: "400px", cursor: "move" };

// This plugin will automatically rotate the globe around its vertical
// axis a configured number of degrees every second.
function autorotate(degPerSec: any) {
  // Planetary.js plugins are functions that take a `planet` instance
  // as an argument...
  return function (planet: any) {
    var lastTick: any = null;
    var paused = false;
    planet.plugins.autorotate = {
      pause: function () {
        paused = true;
      },
      resume: function () {
        paused = false;
      }
    };
    // ...and configure hooks into certain pieces of its lifecycle.
    planet.onDraw(function () {
      if (paused || !lastTick) {
        lastTick = new Date();
      } else {
        var now = new Date();
        //@ts-ignore
        var delta = now - lastTick;
        // This plugin uses the built-in projection (provided by D3)
        // to rotate the globe each time we draw it.
        var rotation = planet.projection.rotate();
        rotation[0] += (degPerSec * delta) / 1000;
        if (rotation[0] >= 180) rotation[0] -= 360;
        planet.projection.rotate(rotation);
        lastTick = now;
      }
    });
  };
}

const Globe: React.FC<GlobeProps, GlobeState> = ({ ping }: GlobeProps) => {
  const canvasRef = useRef(null);
  useLayoutEffect(() => {
    const globe = planetaryjs.planet();
    globe.loadPlugin(autorotate(10));
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    //
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(
      planetaryjs.plugins.earth({
        topojson: { file: "/world-110m.json" },
        oceans: { fill: "#000080" },
        land: { fill: "#339966" },
        borders: { stroke: "#008000" }
      })
    );

    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(planetaryjs.plugins.pings());
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.
    globe.loadPlugin(
      planetaryjs.plugins.zoom({
        scaleExtent: [100, 300]
      })
    );
    globe.loadPlugin(
      planetaryjs.plugins.drag({
        // Dragging the globe should pause the
        // automatic rotation until we release the mouse.
        onDragStart: function () {
          this.plugins.autorotate.pause();
        },
        onDragEnd: function () {
          this.plugins.autorotate.resume();
        }
      })
    );
    // Set up the globe's initial scale, offset, and rotation.
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

    setInterval(function () {
      if (ping && ping.latitude && ping.longitude) {
        globe.plugins.pings.add(ping.longitude, ping.latitude, {
          color: "yellow",
          ttl: 2000,
          angle: Math.random() * 10
        });
      }
    }, 500);

    const canvas = canvasRef.current;
    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    // Draw that globe!
    globe.draw(canvas);
  }, [ping]);
  return (
    <canvas
      id="rotatingGlobe"
      width="400"
      height="400"
      style={globeStyle}
      ref={canvasRef}
    ></canvas>
  );
};

export default Globe;
