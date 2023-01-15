package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.logging.Logger;

import model.Item;

public class ProductSingleServiceImpl implements IProductSingleService{

	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());
	
	@Override
	public Item getProduct(String itemID) {
		// TODO Auto-generated method stub
		
		Item item = new Item();
		
		item.setItemID(itemID);
		
		return item;
	}

}
