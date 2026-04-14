import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import PCBuilder from "@/pages/PCBuilder";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route 
                path={ROUTE_PATHS.HOME} 
                element={<Home />} 
              />
              <Route 
                path={ROUTE_PATHS.PRODUCTS} 
                element={<Products />} 
              />
              <Route 
                path={ROUTE_PATHS.PRODUCT_DETAIL} 
                element={<ProductDetail />} 
              />
              <Route 
                path={ROUTE_PATHS.CART} 
                element={<Cart />} 
              />
              <Route 
                path={ROUTE_PATHS.CHECKOUT} 
                element={<Checkout />} 
              />
              <Route 
                path="*" 
                element={<Home />} 
              />
              <Route 
                path="/pc-builder" 
                element={<PCBuilder />} 
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
        <Sonner position="top-right" expand={false} richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;