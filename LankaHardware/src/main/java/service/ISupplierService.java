package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Supplier;

public interface ISupplierService {
	
	public static final Logger log = Logger.getLogger(ICartService.class.getName());
	
	public ArrayList<Supplier> getAllSuppliers();
	
	public String addSuppliers(Supplier supplier);

	public String removeSuppliers(String supNo);

	

}
