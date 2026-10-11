import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
}

/**
 * Brand Category Icon: Indoor Plants (Monoline Leaf)
 */
export function IndoorPlantsIcon({
  className = 'w-6 h-6',
  strokeWidth = 1.75,
  color = 'currentColor',
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Indoor Plants"
    >
      {/* Organic pointed leaf outline */}
      <path d="M4 19.5 C4.5 14 7 7 19.5 4.5 C17 17 10 19.5 4 19.5 Z" />
      {/* Leaf center vein */}
      <path d="M4 19.5 C8.5 15.5 13 11 19.5 4.5" />
    </svg>
  );
}

/**
 * Brand Category Icon: Outdoor Plants (Monoline Flower)
 */
export function OutdoorPlantsIcon({
  className = 'w-6 h-6',
  strokeWidth = 1.75,
  color = 'currentColor',
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Outdoor Plants"
    >
      {/* Flower center */}
      <circle cx="12" cy="12" r="3" />
      {/* 5 Petals */}
      <path d="M12 9 C10.5 6 13.5 6 12 9" />
      <path d="M12 3 C10 3 9 5 11 8 C11.5 8.7 12.5 8.7 13 8 C15 5 14 3 12 3 Z" />
      <path d="M21 12 C21 10 19 9 16 11 C15.3 11.5 15.3 12.5 16 13 C19 15 21 14 21 12 Z" />
      <path d="M17.5 19.5 C19 18 18 16 15 15 C14.2 14.7 13.6 15.4 13.9 16.2 C14.8 19 16.5 20.5 17.5 19.5 Z" />
      <path d="M6.5 19.5 C7.5 20.5 9.2 19 10.1 16.2 C10.4 15.4 9.8 14.7 9 15 C6 16 5 18 6.5 19.5 Z" />
      <path d="M3 12 C3 14 5 15 8 13 C8.7 12.5 8.7 11.5 8 11 C5 9 3 10 3 12 Z" />
    </svg>
  );
}

/**
 * Brand Category Icon: Pots & Planters (Monoline Terracotta Gamla)
 */
export function PotsPlantersIcon({
  className = 'w-6 h-6',
  strokeWidth = 1.75,
  color = 'currentColor',
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Pots and Planters"
    >
      {/* Top Rim */}
      <rect x="4" y="5" width="16" height="3" rx="1.5" />
      {/* Pot Body */}
      <path d="M5.5 8 L7.5 18 C7.8 19.2 8.8 20 10 20 L14 20 C15.2 20 16.2 19.2 16.5 18 L18.5 8" />
      {/* Subtle interior rim accent */}
      <line x1="7" y1="12" x2="17" y2="12" opacity="0.35" />
    </svg>
  );
}

/**
 * Brand Category Icon: Seeds & Gardening (Monoline Sprout)
 */
export function SeedsGardeningIcon({
  className = 'w-6 h-6',
  strokeWidth = 1.75,
  color = 'currentColor',
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Seeds and Gardening"
    >
      {/* Sprout stem */}
      <path d="M12 21 V11 C12 8.5 10 6 7 6 C7 9 9 11 12 11" />
      {/* Right leaf */}
      <path d="M12 11 C12 8.5 14 6 17 6 C17 9 15 11 12 11" />
      {/* Seed base */}
      <path d="M9 21 C9 20 10.3 19 12 19 C13.7 19 15 20 15 21 Z" />
    </svg>
  );
}
