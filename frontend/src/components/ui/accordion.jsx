import React, { createContext, useContext } from 'react';

const AccordionContext = createContext(null);

export function Accordion({ children, type = 'single', collapsible = false, className = '' }) {
  const [openValue, setOpenValue] = React.useState(null);
  const toggle = (value) => {
    if (type === 'single') {
      if (openValue === value) {
        if (collapsible) setOpenValue(null);
      } else {
        setOpenValue(value);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, value, className = '' }) {
  return (
    <div className={className} data-accordion-value={value}>
      {children}
    </div>
  );
}

export function AccordionTrigger({ children, className = '' }) {
  const ctx = useContext(AccordionContext);
  // find parent value from data attribute
  const parent = React.useRef(null);
  React.useEffect(() => {
    parent.current = document.querySelector(`[data-accordion-value] button[data-trigger-for]`);
  }, []);

  return (
    <div>
      {/* This trigger expects the parent AccordionItem to set data-accordion-value on ancestor */}
      <button
        onClick={(e) => {
          // walk up to find ancestor with data-accordion-value
          let el = e.target;
          while (el && !el.dataset.accordionValue) el = el.parentElement;
          const val = el ? el.dataset.accordionValue : null;
          if (ctx && val) ctx.toggle(val);
        }}
        className={className}
        aria-expanded={false}
      >
        {children}
      </button>
    </div>
  );
}

export function AccordionContent({ children, className = '' }) {
  const ctx = useContext(AccordionContext);
  // We need to determine whether this content is open based on ancestor data-accordion-value
  const ref = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // find ancestor with data-accordion-value
    let el = node.parentElement;
    let val = null;
    while (el && !el.dataset.accordionValue) el = el.parentElement;
    if (el) val = el.dataset.accordionValue;

    const update = () => {
      setIsOpen(ctx ? ctx.openValue === val : false);
    };

    update();
    // subscribe to changes by polling openValue (simple)
    const id = setInterval(update, 50);
    return () => clearInterval(id);
  }, [ctx]);

  return (
    <div ref={ref} className={`${className} ${isOpen ? 'block' : 'hidden'}`}>{children}</div>
  );
}
