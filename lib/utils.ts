export const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
export const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
