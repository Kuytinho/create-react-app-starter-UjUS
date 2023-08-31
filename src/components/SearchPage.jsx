import React, { useState, useEffect } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const results = await fetch(`/api/products?searchQuery=${searchQuery}&category=${category}&website=${website}`);
      if (!results.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await results.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Adicione lógica para lidar com erros, como exibir uma mensagem de erro para o usuário.
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category, website]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Product Search</h1>

      <div className="row">
        <div className="col-md-3">
          <select
            className="form-select mb-3 bg-dark text-white" // Adicione as classes de background e cor da fonte aqui
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Mobile">Mobile</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="TV">TV</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select mb-3 bg-dark text-white" // Adicione as classes de background e cor da fonte aqui
            name="website"
            onChange={(e) => setWebsite(e.target.value)}
          >
            <option value="Mercado Livre">Mercado Livre</option>
            <option value="Buscapé">Buscapé</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control mb-3"
            name="searchQuery"
            placeholder="Product name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-primary mb-3" onClick={fetchProducts}>
            Search
          </button>
        </div>
      </div>

      <ul className="list-unstyled">
        {products.map((product) => (
          <li key={product.id} className="media mb-3">
            <img src={product.photo || 'url_da_imagem_padrao.png'} alt={product.name} className="mr-3" />
            <div className="media-body">
              <h5 className="mt-0">{product.name}</h5>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              <p>Website: {product.website}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;