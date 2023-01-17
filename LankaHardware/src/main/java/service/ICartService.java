package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Cart;
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
	public String addToCart(String email, String itemID, int quantity, String size);
	
	/**
	 * Change quantity
	 * @param email
	 * @param itemID
	 * @param quantity
	 */
	public void changeQuantity(String email, String itemID, int quantity, String size);
	
	/**
	 * clear one item from cart
	 * @param email
	 * @param itemID
	 * @return 
	 */
	public String clearOneItemFromCart(String email, String itemID, String size);
	
	/**
	 * clear cart
	 * @param email
	 */
	public String clearCart(String email);
	
	/**
	 * get items in cart
	 * @param email
	 */
	public Cart getCart(String email);
	
	/**
	 * calculate total
	 * @param email
	 */
	public double calculateTotal(ArrayList<Item> items);
	
	/**
	 * get a default size
	 * @param itemID
	 */
	public String getDefaultSize(String itemID);
}
