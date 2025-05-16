import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Layout } from "./components/layout/Layout";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import EncyclopediaList from "@/pages/encyclopedia/index";
import EncyclopediaDetail from "@/pages/encyclopedia/[slug]";
import TestsList from "@/pages/tests/index";
import TestFlow from "@/pages/tests/[slug]";
import TestResults from "@/pages/tests/results";
import Customizer from "@/pages/customizer";
import BlogList from "@/pages/blog/index";
import BlogPost from "@/pages/blog/[slug]";
import EtsyRedirect from "@/pages/etsy-redirect";
import Profile from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/encyclopedia" component={EncyclopediaList} />
      <Route path="/encyclopedia/:slug" component={EncyclopediaDetail} />
      <Route path="/tests" component={TestsList} />
      <Route path="/tests/:slug" component={TestFlow} />
      <Route path="/tests/results" component={TestResults} />
      <Route path="/customizer" component={Customizer} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/etsy-redirect" component={EtsyRedirect} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoritesProvider>
          <Layout>
            <Toaster />
            <Router />
          </Layout>
        </FavoritesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
