import React from 'react';
import Responsive from 'react-responsive';

export const BREAKPOINT_MOBILE = 320;
export const BREAKPOINT_TABLET = 768;
export const BREAKPOINT_LAPTOP = 1024;
export const BREAKPOINT_DESKTOP = 1200;

export function Mobile({ children }) {
  return <Responsive maxWidth={BREAKPOINT_TABLET - 1} children={children} />;
}

export function Tablet({ children }) {
  return <Responsive minWidth={BREAKPOINT_TABLET} children={children} />;
}

export function Desktop({ children }) {
  return <Responsive minWidth={BREAKPOINT_DESKTOP} children={children} />;
}

