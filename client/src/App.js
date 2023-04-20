import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import VideoDetail from "./pages/Video/VideoDetail";
import ChannelDetail from "./pages/Channel/ChannelDetail";
import { Navbar } from "./components";
import Feed from "./pages/Feed";
import SearchFeed from "./pages/SearchFeed";
import Login from "./pages/Auth/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/Auth/ForgotPassword";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
