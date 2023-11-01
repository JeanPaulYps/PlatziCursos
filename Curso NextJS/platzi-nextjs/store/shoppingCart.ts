import { create } from 'zustand'

interface ShoppingCartProduct extends Omit<TProduct, 'attributes'> {
  quantity: number
}

interface ShoppingCartStore {
  shoppingCart: ShoppingCartProduct[]
  addProductToShoppingCart: (
    shoppingCartProduct: TProduct,
    quantity: number
  ) => void
  removeProductFromShoppingCart: (
    shoppingCartProduct: ShoppingCartProduct
  ) => void
  updateTotalQuantity: () => void
  totalItems: number
}

export const useShoppingCart = create<ShoppingCartStore>((set, get) => {
  return {
    shoppingCart: [],
    totalItems: 0,

    updateTotalQuantity: () => {
      const { shoppingCart } = get()
      const totalQuantity = shoppingCart.reduce(
        (total, product) => total + product.quantity,
        0
      )
      set({ totalItems: totalQuantity })
    },

    addProductToShoppingCart: (shoppingCartProduct, quantity) => {
      const { shoppingCart, updateTotalQuantity } = get()

      const productIndexInShoppingCart = shoppingCart.findIndex(
        ({ id }) => shoppingCartProduct.id === id
      )

      let newShoppingCart = [...shoppingCart]

      if (productIndexInShoppingCart === -1) {
        newShoppingCart.push({ ...shoppingCartProduct, quantity })
      } else {
        newShoppingCart[productIndexInShoppingCart].quantity += quantity
      }
      set({ shoppingCart: newShoppingCart })
      updateTotalQuantity()
      console.log(newShoppingCart)
    },

    removeProductFromShoppingCart: (shoppingCartProduct) => {
      const { shoppingCart } = get()

      const productIndexInShoppingCart = shoppingCart.findIndex(
        ({ id }) => shoppingCartProduct.id === id
      )

      if (productIndexInShoppingCart === -1) {
        return
      }

      const newShoppingCart = [...shoppingCart]
      newShoppingCart.splice(
        productIndexInShoppingCart,
        productIndexInShoppingCart + 1
      )

      set({ shoppingCart: newShoppingCart })
    },
  }
})
