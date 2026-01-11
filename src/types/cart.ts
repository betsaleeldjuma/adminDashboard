export interface CartProduct {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedTotal: number
}

export interface Cart {
  id: number
  userId: number
  total: number              // montant total de la commande
  totalProducts: number      // nombre de produits distincts
  totalQuantity: number      // quantité totale (somme des quantités)
  products: CartProduct[]   // produits commandés
}
