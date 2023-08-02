import { Box, Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import Videos from "./Video/Videos";
import { FetchFromAPI } from "../utils/FetchFromAPI";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchTerm } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    FetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
    });
  }, [searchTerm]);

  const memoizedVideosComponent = useMemo(
    () => <Videos videos={videos} />,
    [videos]
  );

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for:{" "}
        <span style={{ color: "#f31503" }}>{searchTerm}</span> videos
      </Typography>

      {memoizedVideosComponent}
    </Box>
  );
};

export default SearchFeed;
