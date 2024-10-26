const saveCartToSessionStorage = (cart) => {
    try {
        const serializedState = JSON.stringify(cart);
        sessionStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn("Failed to save cart to sessionStorage", e);
    }
};

const cartMiddleware = (store) => (next) => (action) => {
    console.log("Dispatching action:", action.type);
    const result = next(action); 

    if (action.type.startsWith('Cart/')) {
        const state = store.getState();
        saveCartToSessionStorage(state.cart); 
    }

    return result; 
};



export default cartMiddleware;
