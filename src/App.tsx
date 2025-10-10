import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  /*   this is the place we need to wrap our app with redux provider if we are using redux
  also we can add any context providers here if needed
  e.g., AuthProvider, ThemeProvider, etc.
  also tanstack query provider if we are using react-query
  also we can add error boundary here if needed */

  // Integrate the router with the application
  return <RouterProvider router={router} />;
}

export default App;
