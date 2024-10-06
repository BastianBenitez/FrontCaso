import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProductCard() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        border: "1px solid #1c2125",
        borderRadius: "1rem",
        backgroundColor: "#0f1114",
      }}
    >
      <CardMedia
        sx={{
          height: 150,
          width: "90%",
          display: "flex",
          justifyContent: "center",
          margin: "0.5rem auto",
          backgroundColor: "#0f1114",
          borderRadius: "1rem",
        }}
        image="https://i.ytimg.com/vi/pZGm-FTFa9w/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLB91Vca1Ujz8r08xRZcTUNRzTKlJg"
        title="green iguana"
      />
      <CardContent sx={{ maxWidth: 345, backgroundColor: "#0f1114" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "white" }}
        >
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{ backgroundColor: "#0f1114" }}>
        <Button size="small">Mas informacion</Button>
        <Button size="small">Al carrito</Button>
      </CardActions>
    </Card>
  );
}
