/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const updateLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export default new Vuex.Store({
  state: {
    cart: [],
    activeProduct: {},
  },
  getters: {
    getActiveProduct(state) {
      return state.activeProduct;
    },
    getCart(state) {
      return state.cart;
    },
    totalPrice(state) {
      let result = 0;
      state.cart.forEach((product) => {
        result += product.price * product.quantity;
      });
      return result;
    },
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const item = state.cart.find((i) => i.id === product.id);
      console.log(product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      updateLocalStorage(state.cart);
    },
    SET_ACTIVE_PRODUCT(state, product) {
      state.activeProduct = product;
    },

    DELETE_PRODUCT(state, product) {
      const item = state.cart.find((i) => i.id === product.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== product.id);
        }
      }
      updateLocalStorage(state.cart);
    },

    DECREASE_PRODUCT(state, product) {
      let p = null;
      state.cart = state.cart.map((prod) => {
        if (prod.id === product.id) {
          prod.quantity -= 1;
          p = prod;
        }
        return prod;
      });

      if (p) {
        if (p.quantity < 1) {
          const idx = state.cart.indexOf(p);
          state.cart.splice(idx, 1);
        }
      }

      updateLocalStorage(state.cart);
    },

    SET_CART_EMPTY(state) {
      state.cart = [];
      updateLocalStorage(state.cart);
    },
    UPDATE_CART_FROM_LOCALSTORAGE(state) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },
  },
  actions: {
    addProduct({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    setActiveProduct({ commit }, product) {
      commit('SET_ACTIVE_PRODUCT', product);
    },
    deleteProduct({ commit }, product) {
      commit('DELETE_PRODUCT', product);
    },
    decreaseProduct({ commit }, product) {
      commit('DECREASE_PRODUCT', product);
    },
    setCartEmpty({ commit }) {
      commit('SET_CART_EMPTY');
    },
  },

});
