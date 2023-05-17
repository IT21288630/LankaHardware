package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Checkout;
import model.Item;
import model.Orderreal;

public interface ICheckoutService {

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IChartService.class.getName());
	
	/**
	 * checking out
	 */
	public void checkout(Orderreal orderreal);
	
	/**
	 * get completed orders
	 */
	public ArrayList<Orderreal> getCompletedOrders(String email);
}
