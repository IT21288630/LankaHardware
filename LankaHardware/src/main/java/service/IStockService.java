package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

import javax.servlet.http.Part;

import model.Item;

public interface IStockService {
	public static final Logger log = Logger.getLogger(IStockService.class.getName());

	public ArrayList<Item> getAllStockItems();
	
	public String addStockItems(Item item, Collection<Part> parts); 

	public String removeStockItems(String itemID);

	public String updateStockItems(String itemID, String p_name, String cat, String Brand,double U_price, String Des, String mf,String exp,String Warranty);

	
	

}
