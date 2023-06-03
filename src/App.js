import wheelCenter from "./assets/wheel-center-light.webp";
import needle from "./assets/needle.svg";
import wristWatch from "./assets/watch.avif";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

function App() {
  const [gradientStop, setGradientStop] = useState(50);
  const [isRolling, setIsRolling] = useState(50);
  const minDuration = 4; // Minimum duration in seconds
  const maxDuration = 6; // Maximum duration in seconds
  const [rollingDuration, setRollingDuration] = useState(0);

  const handleGradientChange = (event) => {
    setGradientStop(event.target.value); // Update gradient stop value
  };

  const circleBeforeStyle = {
    borderRadius: "100%",
    content: '""',
    backgroundImage: "linear-gradient(to bottom, #fff, #3c9d43)",
    top: "-15px",
    left: "-15px",
    bottom: "-15px",
    right: "-15px",
    position: "absolute",
    zIndex: "-1",
  };

  circleBeforeStyle.backgroundImage = `linear-gradient(to top, #3c9d43, #fff ${gradientStop}%)`;

  const handleRolling = () => {
    // Generate a random duration within the range
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    setRollingDuration(duration); // Update rolling duration
    setIsRolling(true); // Set rolling state to true
  };

  useEffect(() => {
    if (isRolling) {
      setTimeout(() => {
        setIsRolling(false); // Set the rolling state to false after the rolling duration has passed
      }, rollingDuration * 1000);
    }
  }, [isRolling]);

  return (
    <>
      <div className="wrapper">
        <div>
          <div className="circle">
            <div className="circle-before" style={circleBeforeStyle}></div>
            <h4 className="title">Royal Oak Tourbillon</h4>
            <div className="price">$1,192,590.00</div>
            <img
              src={needle}
              style={{
                bottom: "50%",
                transformOrigin: "bottom",
                transform: `rotate(${360 * rollingDuration}deg)`,
                transformStyle: "preserve-3d",
                filter: "drop-shadow(2px 4px 4px gray)",
                pointerEvents: "none",
                position: "absolute",
                zIndex: 2,
                transition: `${rollingDuration}s linear`,
              }}
              alt="needle"
            />
            <img src={wheelCenter} alt="wheelCenter" className="wheelCenter" />
            <img src={wristWatch} alt="wristWatch" className="wristWatch" />
          </div>

          <div className="deal-section">
            {isRolling ? (
              <div className="rolling-text">Rolling</div>
            ) : (
              <div className="deal">
                <Icon icon={"mingcute:refresh-2-line"} />
                DEAL FOR $1,060,080.00
              </div>
            )}

            <div className="refresh" onClick={handleRolling}>
              <Icon icon={"system-uicons:refresh-alt"} />
            </div>
            <div className="spin">
              <div className="spin-checkbox" />
              QUICK SPIN
            </div>
          </div>

          <div className="box">
            <p className="title">CHANCE</p>
            <div className="chance-box">
              <input
                value={`${((gradientStop * 80) / 280).toFixed(2)}%`}
                className="price-input"
              />
              <div className="chance-btns">
                <div>Min</div>
                <div>10%</div>
                <div>25%</div>
                <div>50%</div>
                <div>Max</div>
              </div>
            </div>
            <p className="title">PRICE</p>
            <input
              value={`$${((1060080 * gradientStop) / 280).toLocaleString()}`}
              className="price-input"
            />

            <input
              type="range"
              min="0"
              max="280"
              value={gradientStop}
              onChange={handleGradientChange}
              className="range"
            />
            <div className="price-footer">
              <p>$132.51</p>
              <p>$1,060,080.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
