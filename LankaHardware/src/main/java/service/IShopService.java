package service;

import java.util.logging.Logger;

import model.Shop;

public interface IShopService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IShopService.class.getName());

	/**
	 * get items to shop page
	 * 
	 * @param email
	 */
	public Shop getShop();
}
