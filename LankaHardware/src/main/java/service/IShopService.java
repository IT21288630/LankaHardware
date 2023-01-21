package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Item;
import model.Shop;

public interface IShopService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IShopService.class.getName());

	/**
	 * get items to shop page
	 * 
	 */
	public Shop getShop();
	
	/**
	 * get items to shop page
	 * 
	 * @param main category
	 */
	public Shop getItemsByMainCategory(String mainCategory, double lowerPrice, double higherPrice);
	
	/**
	 * get item size list to shop page
	 * 
	 * @param main category
	 */
	public ArrayList<String> getItemSizeList(String itemID);
}
