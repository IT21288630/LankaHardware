package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Item;

public interface IProductSingleService {

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IProductSingleService.class.getName());
	
	/**
	 * for product-single page
	 * @param itemID
	 */
	public Item getProduct(String itemID);
	
	/**
	 * for product-single page
	 * @param itemID
	 */
	public ArrayList<String> getProductSizeList(String itemID);
}
