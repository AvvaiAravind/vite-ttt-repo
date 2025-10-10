import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import queryClient from "./lib/tanstackQuery";
import { router } from "./routes";

function App() {
  /*   this is the place we need to wrap our app with redux provider if we are using redux
  also we can add any context providers here if needed
  e.g., AuthProvider, ThemeProvider, etc.
  also tanstack query provider if we are using react-query
  also we can add error boundary here if needed */

  // Integrate the router with the application
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
