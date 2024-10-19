import ProductCard from "../assets/components/Card/ProductCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: "1600px",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "1600px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            <ProductCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            <ProductCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            <ProductCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center">
            <ProductCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
