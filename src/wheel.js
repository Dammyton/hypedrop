import React, { useRef, useEffect } from "react";

const Wheel = ({ gradientStop }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial angle and wheel size
    let angle = 0;
    const wheelRadius = 170;
    const wheelCenterX = canvas.width / 2;
    const wheelCenterY = canvas.height / 2;
    const wheelColor = "#e5f2f9";
    const wheelInnerEdgeColor = "white";
    const wheelInnerEdgeWidth = 22;
    const wheelOuterEdgeColor = "#f2f3f4";
    const wheelOuterEdgeWidth = 16;
    const smallWheelColor = "green";
    const smallWheelThickness = 16;
    let isDragging = false;

    const drawWheel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the main wheel
      ctx.beginPath();
      ctx.arc(wheelCenterX, wheelCenterY, wheelRadius, 0, 2 * Math.PI);
      ctx.fillStyle = wheelColor;
      ctx.fill();

      // Draw the inner edge of the wheel
      ctx.lineWidth = wheelInnerEdgeWidth;
      ctx.strokeStyle = wheelInnerEdgeColor;
      ctx.stroke();

      // Draw the outer edge of the wheel
      ctx.lineWidth = wheelOuterEdgeWidth;
      ctx.strokeStyle = wheelOuterEdgeColor;
      ctx.stroke();

      // Calculate the position of the circular line
      const lineRadius = wheelRadius + smallWheelThickness / 2 - 8; // Adjusted by 8 pixels
      const lineStartAngle = angle - Math.PI / 2;
      const lineEndAngle =
        lineStartAngle + (gradientStop / 360) * (Math.PI * 2);

      // Draw the circular line
      ctx.beginPath();
      ctx.arc(
        wheelCenterX,
        wheelCenterY,
        lineRadius,
        lineStartAngle,
        lineEndAngle,
        false
      );
      ctx.lineWidth = smallWheelThickness;
      ctx.strokeStyle = smallWheelColor;
      ctx.lineCap = "round";
      ctx.stroke();

      if (isDragging) {
        // Update the angle based on the mouse position
        const handleMouseMove = (event) => {
          const rect = canvas.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          const dx = mouseX - wheelCenterX;
          const dy = mouseY - wheelCenterY;
          angle = Math.atan2(dy, dx);
        };

        // Attach the mousemove event listener
        document.addEventListener("mousemove", handleMouseMove);

        // Clean up the event listener on mouse up or leave
        const handleMouseUp = () => {
          isDragging = false;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.removeEventListener("mouseleave", handleMouseUp);
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseUp);
      }

      // Request the next animation frame
      requestAnimationFrame(drawWheel);
    };

    drawWheel();

    // Handle mouse events to initiate dragging
    const handleMouseDown = () => {
      isDragging = true;
    };

    // Attach the mousedown event listener
    canvas.addEventListener("mousedown", handleMouseDown);

    // Clean up event listener on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [gradientStop]);

  return (
    <canvas
      ref={canvasRef}
      width={380}
      height={380}
      style={{ touchAction: "none", cursor: "grab" }}
    />
  );
};

export default Wheel;
