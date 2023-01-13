package service;

import java.util.logging.Logger;

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
}
