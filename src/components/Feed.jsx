import { Stack, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { SideBar, Videos} from "./";
import { FetchFromAPI } from "../utils/FetchFromAPI";

const Feed = () => {

  const [ selectedCategory, setSelectedCategory ] = useState('New');

  useEffect(() => {
    FetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: {sx:'column', md:'row' } }} >
      <Box sx={{height:{sx: 'auto', md:'92vh'}, borderRight: '1px solid #3d3d3d', px: {sm:0, md:2 }}}>
        <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Typography className="copyright" variant="body2" sx={{ mt:1.5, color: '#fff' }}>Copyright 2023, © Bikash</Typography>
      </Box>

      <Box p={2} sx={{overflowY:'auto', height: '90vh', flext: 2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{color: 'white'}}>
          New  <span style={{color: '#fc1503' }}>videos</span>
        </Typography>

        <Videos videos={[]} />
      </Box>
    </Stack>
  )
}

export default Feed
