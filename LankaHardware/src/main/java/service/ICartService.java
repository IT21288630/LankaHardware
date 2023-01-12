package service;

import java.util.logging.Logger;

import model.Cart;

public interface ICartService {

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(ICartService.class.getName());
	
	/**
	 * Create a cart
	 * @param email
	 */
	public void createCart(String email);
	
	/**
	 * add to cart
	 * @param cart
	 */
	public void addToCart(String email);
}
