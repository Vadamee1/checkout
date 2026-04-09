export type StockStatus = {
  label: string;
  color: string;
  isAvailable: boolean;
};

export function getStockStatus(stock: string): StockStatus {
  if (Number(stock) === 0) {
    return {
      label: "No disponible",
      color: "bg-red-500",
      isAvailable: false,
    };
  }

  if (Number(stock) <= 50) {
    return {
      label: "Poco inventario",
      color: "bg-orange-500",
      isAvailable: true,
    };
  }

  return {
    label: "Disponible",
    color: "bg-green-500",
    isAvailable: true,
  };
}
