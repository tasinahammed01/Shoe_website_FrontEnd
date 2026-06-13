"use client";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: "thin" | "medium" | "thick";
  color?: "gray" | "black";
  className?: string;
}

const orientationClasses = {
  horizontal: "w-full h-px",
  vertical: "h-full w-px",
};

const thicknessClasses = {
  thin: "border-t",
  medium: "border-t-2",
  thick: "border-t-4",
};

const colorClasses = {
  gray: "border-gray-200",
  black: "border-black/10",
};

export default function Divider({
  orientation = "horizontal",
  thickness = "thin",
  color = "gray",
  className = "",
}: DividerProps) {
  return (
    <div
      className={`
        ${orientationClasses[orientation]} 
        ${thicknessClasses[thickness]} 
        ${colorClasses[color]} 
        ${className}
      `}
    />
  );
}
