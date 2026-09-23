 export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}