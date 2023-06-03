import React, { useRef, useEffect } from "react";

const Wheel = ({ gradientStop }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial angle and wheel size
    const wheelRadius = 170;
    const wheelCenterX = canvas.width / 2;
    const wheelCenterY = canvas.height / 2;
    const wheelInnerEdgeColor = "white";
    const wheelInnerEdgeWidth = 22;
    const wheelOuterEdgeColor = "#f2f3f4";
    const wheelOuterEdgeWidth = 16;
    const smallWheelColor = "green";
    const smallWheelThickness = 16;
    let isDragging = false;
    const offsetAngle = Math.PI / 2; // Offset angle to adjust the starting position
    let angle = Math.PI + offsetAngle; // Initial position at 80% around the circle with offset

    const drawWheel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a temporary canvas for applying gradients
      const gradientCanvas = document.createElement("canvas");
      const gradientCtx = gradientCanvas.getContext("2d");
      gradientCanvas.width = canvas.width;
      gradientCanvas.height = canvas.height;

      // Define the radial gradient
      const radialGradient = gradientCtx.createRadialGradient(
        wheelCenterX,
        wheelCenterY,
        0,
        wheelCenterX,
        wheelCenterY,
        wheelRadius
      );
      radialGradient.addColorStop(0, "rgba(217, 136, 255, 0.2)");
      radialGradient.addColorStop(1, "rgba(217, 136, 255, 0)");

      // Define the linear gradient
      const linearGradient = gradientCtx.createLinearGradient(
        0,
        wheelCenterY - wheelRadius,
        0,
        wheelCenterY + wheelRadius
      );
      linearGradient.addColorStop(0, "#c5e2c7");
      linearGradient.addColorStop(1, "#e5f2f9");

      // Apply gradients to the temporary canvas
      gradientCtx.fillStyle = radialGradient;
      gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);
      gradientCtx.fillStyle = linearGradient;
      gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

      // Draw the main wheel using the gradient pattern
      const pattern = ctx.createPattern(gradientCanvas, "no-repeat");
      ctx.beginPath();
      ctx.arc(wheelCenterX, wheelCenterY, wheelRadius, 0, 2 * Math.PI);
      ctx.fillStyle = pattern;
      ctx.fill();

      // Draw the inner edge of the wheel
      ctx.lineWidth = wheelInnerEdgeWidth;
      ctx.strokeStyle = wheelInnerEdgeColor;
      ctx.stroke();

      // Draw the outer edge of the wheel
      ctx.lineWidth = wheelOuterEdgeWidth;
      ctx.strokeStyle = wheelOuterEdgeColor;
      ctx.stroke();

      // Calculate the position of the green line based on the gradientStop value
      const smallWheelStartAngle = -Math.PI / 2;
      const smallWheelEndAngle = smallWheelStartAngle + angle;
      const smallWheelX = wheelCenterX;
      const smallWheelY = wheelCenterY;

      // Draw the small wheel
      ctx.beginPath();
      ctx.arc(
        smallWheelX,
        smallWheelY,
        wheelRadius,
        smallWheelStartAngle,
        smallWheelEndAngle
      );
      ctx.lineWidth = smallWheelThickness;
      ctx.strokeStyle = smallWheelColor;
      ctx.lineCap = "round";
      ctx.stroke();

      if (isDragging) {
        // Attach the mousemove event listener
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseUp);
      }

      // Request the next animation frame
      requestAnimationFrame(drawWheel);
    };

    drawWheel();

    // Update the angle based on the mouse position
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const dx = mouseX - wheelCenterX;
      const dy = mouseY - wheelCenterY;
      angle = Math.atan2(dy, dx);
    };

    // Clean up the event listener on mouse up or leave
    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };

    // Handle mouse events to initiate dragging
    const handleMouseDown = () => {
      isDragging = true;
    };

    // Attach the mousedown event listener
    canvas.addEventListener("mousedown", handleMouseDown);

    // Clean up event listener on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [gradientStop]);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={380}
      style={{ touchAction: "none", cursor: "grab" }}
    ></canvas>
  );
};

export default Wheel;
