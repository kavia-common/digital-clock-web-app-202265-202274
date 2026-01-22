/* eslint-disable no-console */
// PUBLIC_INTERFACE
const reportWebVitals = (onPerfEntry) => {
  /** Optional performance reporting hook used by Create React App. */
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Intentionally left minimal; CRA normally wires this to web-vitals package.
    // Keeping the file avoids template/import churn if added later.
    console.debug("web-vitals reporting is not configured.");
  }
};

export default reportWebVitals;
