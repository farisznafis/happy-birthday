import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Diagnostic logging
console.log("[main.tsx] App initialization started");

function mountApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    const errorMsg = "Root element (#root) not found in DOM";
    console.error(`[main.tsx] FATAL: ${errorMsg}`);

    // Display error on page instead of showing blank screen
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: white;
        padding: 20px;
      ">
        <div style="
          max-width: 600px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 16px;
          text-align: center;
        ">
          <h1 style="margin: 0 0 20px 0; font-size: 28px;">⚠️ Application Error</h1>
          <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">
            ${errorMsg}
          </p>
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            Check the browser console for more details.
          </p>
        </div>
      </div>
    `;
    throw new Error(errorMsg);
  }

  try {
    console.log("[main.tsx] Creating React root");
    const root = createRoot(rootElement);

    console.log("[main.tsx] Rendering App component");
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );

    console.log("[main.tsx] ✅ App successfully rendered");
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[main.tsx] Render error:", error);

    // Show error overlay on page
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: white;
        padding: 20px;
      ">
        <div style="
          max-width: 700px;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 16px;
          border-left: 4px solid #ff6b6b;
        ">
          <h1 style="margin: 0 0 20px 0; font-size: 28px;">❌ Render Error</h1>
          <pre style="
            margin: 0;
            padding: 15px;
            background: rgba(0,0,0,0.5);
            border-radius: 8px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.4;
          ">${errorMsg}</pre>
          <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.9;">
            💡 Open DevTools (F12) → Console to see full error trace
          </p>
        </div>
      </div>
    `;
  }
}

// Global error handlers
window.addEventListener("error", (event) => {
  console.error("[main.tsx] Uncaught error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[main.tsx] Unhandled promise rejection:", event.reason);
});

// Start app
mountApp();

console.log("[main.tsx] Initialization complete");
