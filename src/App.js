import wheelCenter from "./assets/wheel-center-light.webp";
import needle from "./assets/needle.svg";
import wristWatch from "./assets/watch.avif";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Wheel from "./wheel";

function App() {
  const [gradientStop, setGradientStop] = useState(280);
  const minDuration = 4; // Minimum duration in seconds
  const maxDuration = 6; // Maximum duration in seconds
  const [rollingDuration, setRollingDuration] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGradientChange = (event) => {
    setGradientStop(event.target.value); // Update gradient stop value
  };

  const handleRolling = () => {
    setIsSpinning(true);
    // Generate a random duration within the range
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;

    setTimeout(() => {
      setIsSpinning(false); // Stop the spinning after the specified duration
    }, duration * 1000);

    setRollingDuration(duration); // Update rolling duration
  };

  const checkLandingPosition = () => {
    const greenStop = gradientStop; // Use the current gradient stop value

    setIsSpinning(false);

    const needleAngle = (360 * rollingDuration) % 360; // Calculate the current angle of the needle
    const adjustedNeedleAngle = needleAngle + 90; // Adjust the needle angle to match the starting position

    const rotationDelay = rollingDuration;

    const rotationInterval = 10; // Time interval for updating the needle rotation
    const totalRotations = Math.ceil(rotationDelay / rotationInterval); // Total rotations based on the rotation delay

    let rotationCount = 0; // Counter for the current rotation

    const rotateNeedle = setInterval(() => {
      const rotationStep = adjustedNeedleAngle / totalRotations; // Calculate the rotation step for each interval

      const currentRotation = rotationStep * rotationCount; // Calculate the current rotation angle

      const currentAngle = (currentRotation % 360) - 90; // Calculate the current angle of the needle

      document.getElementById(
        "needle"
      ).style.transform = `rotate(${currentAngle}deg)`; // Update the needle rotation

      rotationCount++; // Increment the rotation counter

      if (rotationCount >= totalRotations) {
        clearInterval(rotateNeedle); // Stop the needle rotation

        // Check if the needle landed on the green or white part
        if (needleAngle <= greenStop) {
          setTimeout(() => {
            alert("The needle landed on the green part!"); // Needle landed on the green part
          }, 500); // Delay the alert for 500 milliseconds to allow the needle to stop spinning
        } else {
          setTimeout(() => {
            alert("The needle landed on the white part!"); // Needle landed on the white part
          }, 500); // Delay the alert for 500 milliseconds to allow the needle to stop spinning
        }
      }
    }, rotationInterval);
  };

  useEffect(() => {
    if (isSpinning && rollingDuration) {
      setTimeout(() => {
        setIsSpinning(false); // Set the rolling state to false after the rolling duration has passed
        checkLandingPosition(); // Check the landing position of the needle
      }, rollingDuration * 1000);
    }
  }, [isSpinning, rollingDuration, setIsSpinning]);

  let newGradientStop = 0;

  const handleChanceClick = (chance) => {
    // Determine the new gradient stop value based on the chance
    if (chance === "Min") {
      newGradientStop = 0.0;
    } else if (chance === "10%") {
      newGradientStop = 35;
    } else if (chance === "25%") {
      newGradientStop = 87.5;
    } else if (chance === "50%") {
      newGradientStop = 175;
    } else if (chance === "Max") {
      newGradientStop = 280;
    }

    setGradientStop(newGradientStop); // Update gradient stop value
  };

  const getNeedleStyle = () => {
    const needleAngle = (360 * rollingDuration) % 360;
    const transitionDuration = isSpinning ? `${rollingDuration}s linear` : "0s";

    return {
      bottom: "50%",
      transformOrigin: "bottom",
      transform: `rotate(${needleAngle}deg)`,
      transformStyle: "preserve-3d",
      filter: "drop-shadow(2px 4px 4px gray)",
      pointerEvents: "none",
      position: "absolute",
      zIndex: 2,
      transition: transitionDuration,
    };
  };

  return (
    <>
      <div className="wrapper">
        <div>
          <div className="container">
            <Wheel gradientStop={gradientStop} />
            <h4 className="title">Royal Oak Tourbillon</h4>
            <div className="price">$1,192,590.00</div>
            <img
              id="needle"
              src={needle}
              style={getNeedleStyle()}
              alt="needle"
              className={isSpinning ? "needle" : ""}
            />

            <img src={wheelCenter} alt="wheelCenter" className="wheelCenter" />
            <img src={wristWatch} alt="wristWatch" className="wristWatch" />
          </div>
          <div>
            <div className="deal-section">
              {isSpinning ? (
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
                  <div onClick={() => handleChanceClick("Min")}>Min</div>
                  <div onClick={() => handleChanceClick("10%")}>10%</div>
                  <div onClick={() => handleChanceClick("25%")}>25%</div>
                  <div onClick={() => handleChanceClick("50%")}>50%</div>
                  <div onClick={() => handleChanceClick("Max")}>Max</div>
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
      </div>
    </>
  );
}

export default App;
