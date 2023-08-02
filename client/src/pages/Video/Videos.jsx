import { Stack, Box } from "@mui/material";
import VideoCard from "./VideoCard";
import ChannelCard from "../Channel/ChannelCard";
import React from "react";

const MemoizedVideoCard = React.memo(VideoCard);
const MemoizedChannelCard = React.memo(ChannelCard);

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return "Loading..";

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <MemoizedVideoCard video={item} />}
          {item.id.channelId && <MemoizedChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
