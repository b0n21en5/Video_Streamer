import { Stack, Box, Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { SideBar } from "../components";
import Videos from "./Video/Videos";
import { FetchFromAPI } from "../utils/FetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    FetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);

  const memoizedVideosComponent = useMemo(
    () => <Videos videos={videos} />,
    [videos]
  );

  const memoizedSelectedCategory = useMemo(
    () => selectedCategory,
    [selectedCategory]
  );

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sm: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={memoizedSelectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023, © Bikash
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {memoizedSelectedCategory}{" "}
          <span style={{ color: "#f31503" }}>videos</span>
        </Typography>

        {memoizedVideosComponent}
      </Box>
    </Stack>
  );
};

export default Feed;
