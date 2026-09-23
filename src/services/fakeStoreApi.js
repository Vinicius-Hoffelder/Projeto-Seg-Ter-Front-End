import { create } from "axios";

const api = create({
  baseURL: "https://fakestoreapi.com",
  timeout: 12000,
});

export const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function loginWithFakeStore(username, password) {
  const users = await getUsers();

  // A atividade pede consultar /users antes de tentar autenticar.
  const user = users.find(
    (item) => item.username === username && item.password === password,
  );

  if (!user) {
    throw new Error("Usuario ou senha invalidos.");
  }

  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return {
    token: response.data.token,
    user,
  };
}

export async function getProducts(category) {
  const endpoint = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";

  const response = await api.get(endpoint);
  return response.data;
}

export async function getProductById(productId) {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export function formatPriceInReal(price) {
  const value = Number(price) || 0;

  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  } catch (_error) {
    return `R$ ${value.toFixed(2)}`;
  }
}
