import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ChannelCard from "./ChannelCard";
import Videos from "../Video/Videos";
import { FetchFromAPI } from "../../utils/FetchFromAPI";

const ChannelDetail = () => {
  const [ChannelDetail, SetChannelDetail] = useState(null);

  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    FetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      SetChannelDetail(data?.items[0])
    );

    FetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(9,146,223,1) 0%, rgba(21,109,177,1) 39%, rgba(234,0,255,1) 100%)",
            height: "300px",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={ChannelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
