"use client";

export default function Home() {
  const getProducts = async () => {
    const data = await fetch("/api/categories");
    const products = await data.json();
    console.log(products);
  };

  return (
    <div className="">
      <button onClick={() => getProducts()}>Obtener categories</button>
    </div>
  );
}
