package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Item;

public interface IWishlistService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(ICartService.class.getName());

	/**
	 * get wishlist id by email
	 * 
	 * @param email
	 */
	public String getWishlistIdByEmail(String email);
	
	/**
	 * create wishlist
	 * 
	 * @param email
	 */
	public void createWishlist(String email);
	
	/**
	 * add to wishlist
	 * 
	 * @param email
	 * @param itemID
	 */
	public String addToWishlist(String email, String itemID);
	
	/**
	 * remove from wishlist
	 * 
	 * @param email
	 * @param itemID
	 */
	public String removeFromWishlist(String email, String itemID);
	
	/**
	 * get wishlist items
	 * 
	 * @param email
	 */
	public ArrayList<Item> getWishlist(String email);
	
}
