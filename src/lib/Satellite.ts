import * as satellitejs from "satellite.js";

function logClass(constructor: Function) {
  console.log("logging class decorator");
}

function logMethod(value: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(value, propertyKey, descriptor);
  };
}

function logProperty() {
  return console.log("property decorator");
  return function (target: any, propertyKey: string) {
    console.log();
  };
}

export interface SatTLE {
  line1: string;
  line2: string;
}

interface ThreeDVector {
  x: number;
  y: number;
  z: number;
}

export interface PositionAndVelocity {
  position: ThreeDVector;
  velocity: ThreeDVector;
}

export interface GroundPosition {
  latitude: number;
  longitude: number;
  height: number;
}

@logClass
export class Satellite {
  @logProperty
  TLE: SatTLE;
  constructor(tle: SatTLE) {
    this.TLE = tle;
  }

  @logMethod("test")
  track() {
    const satrec = satellitejs.twoline2satrec(this.TLE.line1, this.TLE.line2);
    const positionAndVelocity = satellitejs.propagate(satrec, new Date());
    const gmst = satellitejs.gstime(new Date());
    const positionGd = satellitejs.eciToGeodetic(
      positionAndVelocity.position,
      gmst
    );
    const correctedPositionGd = {
      latitude: positionGd.latitude * 10,
      longitude: positionGd.longitude * 10,
      height: positionGd.height
    };

    return [positionAndVelocity, correctedPositionGd];
  }
}

export default Satellite;
