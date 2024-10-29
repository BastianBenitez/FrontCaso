import { useEffect, useState } from "react";
import CardMenu from "../assets/components/CardMenu";
import { Box } from "@mui/material";
import Filters from "../assets/components/Filters"; // Importa el nuevo componente
import BackGround from "../assets/components/BackGround";

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  ingredientes: string[];
  disponible: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Menu = () => {
  const [sushiItems, setSushiItems] = useState<Producto[]>([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    fetch("http://localhost:3000/api/sushis")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSushiItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredItems = sushiItems.filter((item) => {
    if (item.disponible === undefined) return false;

    const matchesFilter = filter
      ? item.disponible === (filter === "available")
      : true;

    const matchesSearch = item.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === "asc" ? a.precio - b.precio : b.precio - a.precio;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <BackGround
        opacity={0.15}
        src="https://sushishop.com/wp-content/uploads/2024/10/SS24_HP.mp4"
      />
      <Filters
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          padding: "10px",
          maxWidth: "1400px",
        }}
      >
        {sortedItems.map((item) => (
          <CardMenu key={item._id} producto={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Menu;
