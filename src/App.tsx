import * as React from "react";
import SatInfo from "./components/SatInfo";
import "./styles.css";
import { SatTLE } from "./lib/Satellite";
const { useState } = React;

const HarbingerTLE: SatTLE = {
  line1:
    "1 44229U 19026E   20182.72211671  .00000311  00000-0  21731-4 0  9992",
  line2: "2 44229  40.0189 281.9735 0006342 137.6625 222.4666 15.21062119 64326"
};

export default function App() {
  const [tle1, setTle1] = useState<string>(HarbingerTLE.line1);
  const [tle2, setTle2] = useState<string>(HarbingerTLE.line2);
  return (
    <div className="App container">
      <h1>Sattellite Tracking Calc</h1>
      <input
        type="text"
        placeholder="TLE1"
        value={tle1}
        onChange={(e) => {
          setTle1(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="TLE2"
        value={tle2}
        onChange={(e) => {
          setTle2(e.target.value);
        }}
      />
      <hr />
      <h2>Position and Velocity</h2>
      {tle1 && tle2 ? <SatInfo tle={{ line1: tle1, line2: tle2 }} /> : null}
    </div>
  );
}
