package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Item;

public interface IStockService {
	public static final Logger log = Logger.getLogger(IStockService.class.getName());

	public ArrayList<Item> getAllSuppliers();
	
	public String addStockItems(Item item); 

	public String removeStockItems(String itemID);

	public String updateStockItems(String p_name, String cat, String Brand,int U_price, String Des, String mf,String exp,String Warranty);
	
	

}
