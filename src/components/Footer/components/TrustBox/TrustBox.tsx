import * as React from 'react';

const { useRef, useEffect } = React;

const TrustBox = () => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = useRef(null);

  useEffect(() => {
    // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
    // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
    // When it is, it will automatically load the TrustBox.
    const w = window as any;
    if (ref.current && w.Trustpilot) {
      w.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  const data = {
    'data-locale': 'en-US',
    'data-style-height': '24px',
    'data-style-width': '100%',
    'data-theme': 'light',
    'data-template-id': '5419b6a8b0d04a076446a9ad',
    'data-businessunit-id': '6034dc56c8cd5b0001738714',
  };

  return (
    <div
      ref={ref} // We need a reference to this element to load the TrustBox in the effect.
      style={{ textAlign: 'center', padding: '1em 0' }}
      {...data}
      // [ long list of data attributes...]
    >
      <a href="https://www.trustpilot.com/review/divesoft.com" target="_blank" rel="noopener">
        Trustpilot
      </a>
    </div>
  );
};

export default () => {
  const enhancedWindow = window as any;

  if (enhancedWindow?.Trustpilot) {
    return <TrustBox />;
  }

  return null;
};
