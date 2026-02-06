"use client";

export default function Home() {
  const getProducts = async () => {
    const data = await fetch("/api/products");
    const products = await data.json();
    console.log(products);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => getProducts()}>Obtener products</button>
    </div>
  );
}
