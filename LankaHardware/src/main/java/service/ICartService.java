package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Item;

public interface ICartService {

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(ICartService.class.getName());
	
	/**
	 * get cart id by email
	 * @param email
	 */
	public String getCartIdByEmail(String email);
	
	/**
	 * Create a cart
	 * @param email
	 */
	public void createCart(String email);
	
	/**
	 * add to cart
	 * @param email
	 * @param itemID
	 * @param quantity
	 */
	public void addToCart(String email, String itemID, int quantity);
	
	/**
	 * Change quantity
	 * @param email
	 * @param itemID
	 * @param quantity
	 */
	public void changeQuantity(String email, String itemID, int quantity);
	
	/**
	 * clear one item from cart
	 * @param email
	 * @param itemID
	 */
	public void clearOneItemFromCart(String email, String itemID);
	
	/**
	 * clear cart
	 * @param email
	 */
	public void clearCart(String email);
	
	/**
	 * get items in cart
	 * @param email
	 */
	public ArrayList<Item> getCart(String email);
}
