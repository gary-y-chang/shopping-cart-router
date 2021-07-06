import axios from 'axios';

const state = {
  cartItems: []
}

const mutations = {
  UPDATE_CART_ITEMS (state, payload) {
    state.cartItems = payload;
  }
}

const actions = {
  getCartItems ({ commit }, token) {
    axios.get(process.env.VUE_APP_API_URL + `/api/cart/5f1a3e7911ea43136d1fd0c8?token=${token}`).then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  },
  addCartItem ({ commit }, cartItem) {
    return axios.post(process.env.VUE_APP_API_URL + '/api/cart/add', cartItem).then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  },
  removeCartItem ({ commit }, cartItem) {
    axios.post(process.env.VUE_APP_API_URL + '/api/cart/delete', cartItem).then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  },
  removeAllCartItems ({ commit }) {
    axios.post(process.env.VUE_APP_API_URL + '/api/cart/delete/all').then((response) => {
      commit('UPDATE_CART_ITEMS', response.data)
    });
  }
}

const getters = {
  cartItems: state => state.cartItems,
  cartTotal: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return (cartItem.qty * cartItem.price.$numberDecimal) + acc;
    }, 0).toFixed(2);
  },
  cartQuantity: state => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.qty + acc;
    }, 0);
  }
}

const cartModule = {
  state,
  mutations,
  actions,
  getters
}

export default cartModule;
