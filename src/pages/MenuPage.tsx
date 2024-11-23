import { useEffect, useState } from "react";
import CardMenu from "../assets/components/Menu/CardMenu";
import { Box } from "@mui/material"; // Corrige la importación de Typography
import Filters from "../assets/components/Menu/Filters"; // Importa el nuevo componente
import BackGround from "../assets/components/BackGround";
import { useCart } from "../CartContext";

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  url: string;
  disponible: boolean;
}

const MenuPage = () => {
  const [sushiItems, setSushiItems] = useState<Producto[]>([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const { addToCart } = useCart(); // Estado del carrito

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

  const handleAddToCart = (producto: Producto) => {
    addToCart({
      id: producto._id, // Asegúrate de usar un identificador único
      name: producto.nombre,
      price: producto.precio,
      quantity: 1,
      image: producto.url, // Si quieres agregar la imagen, también puedes hacerlo
    });
  };

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
          <CardMenu
            key={item._id}
            producto={item}
            onAddToCart={handleAddToCart} // No es necesario un type assertion
          />
        ))}
      </Box>
    </Box>
  );
};

export default MenuPage;
