import React, { useState, useEffect } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [products, setProducts] = useState("");

  const fetchProducts = async () => {
    const results = await fetch(`/api/products?searchQuery=${searchQuery}&category=${category}&website=${website}`);
    const data = await results.json();

    setProducts(data);
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, [searchQuery, category, website]);

  // const products = useState(null);

  return (
    <div>
      <h1>Product Search</h1>

      <select name="category" onChange={(e) => setCategory(e.target.value)}>
        <option value="Mobile">Mobile</option>
        <option value="Refrigerator">Refrigerator</option>
        <option value="TV">TV</option>
      </select>

      <select name="website" onChange={(e) => setWebsite(e.target.value)}>
        <option value="Mercado Livre">Mercado Livre</option>
        <option value="Buscapé">Buscapé</option>
      </select>

      <input
        type="text"
        name="searchQuery"
        placeholder="Product name"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button type="submit">Search</button>

      <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            <img src={product.photo} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Website: {product.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
