import * as React from "react";
import {
  Satellite,
  SatTLE,
  PositionAndVelocity,
  GroundPosition
} from "../lib/Satellite";
import Globe from "./Globe";
const { useState, useEffect } = React;

type SatInfoProps = {
  tle: SatTLE;
};
type SatInfoState = {};

const SatInfo: React.FC<SatInfoProps, SatInfoState> = ({
  tle
}: SatInfoProps) => {
  const [vectors, setVectors] = useState<PositionAndVelocity>();
  const [groundPos, setGroundPos] = useState<GroundPosition>();
  useEffect(() => {
    const sat = new Satellite(tle);
    const [positionAndVelocity, groundPosition]: [
      PositionAndVelocity,
      GroundPosition
    ] = sat.track() as [PositionAndVelocity, GroundPosition];
    setVectors(positionAndVelocity);
    setGroundPos(groundPosition);
  }, [tle]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Vector</th>
            <th>X</th>
            <th>Y</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Position</td>
            <td>{vectors?.position.x}</td>
            <td>{vectors?.position.y}</td>
            <td>{vectors?.position.z}</td>
          </tr>
          <tr>
            <td>Velocity</td>
            <td>{vectors?.velocity.x}</td>
            <td>{vectors?.velocity.y}</td>
            <td>{vectors?.velocity.z}</td>
          </tr>
        </tbody>
      </table>

      {groundPos && <Globe ping={groundPos} />}
    </div>
  );
};

export default SatInfo;
