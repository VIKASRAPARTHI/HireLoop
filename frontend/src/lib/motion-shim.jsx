import React from 'react';

// Lightweight shim for motion/react when motion library isn't installed.
// It simply renders the requested SVG/HTML element and forwards props/children.
// Animation-related props are ignored but left on the element for future upgrade.

function makeTag(tag) {
  const Component = tag;
  const Wrapped = React.forwardRef(({ children, ...rest }, ref) => {
    return React.createElement(Component, { ref, ...rest }, children);
  });
  Wrapped.displayName = `motion.${tag}`;
  return Wrapped;
}

const tags = [
  'div','span','svg','path','circle','line','tr','td','table','tbody','thead','button','ul','li','h1','h2','h3','p'
];

export const motion = tags.reduce((acc, t) => {
  acc[t] = makeTag(t);
  return acc;
}, {});

export default motion;
