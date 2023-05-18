package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

import javax.servlet.http.Part;

import com.google.gson.JsonElement;

import model.Admin;
import model.Customer;


public interface ICustomerService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(ICustomerService.class.getName());

	public ArrayList<Customer> getAllCustomers();

	public String register(Customer customer);

	public String removeCustomers(String email);

	public String updateCustomers(String email, String Password,  String phone,String name, String address,Collection<Part> parts);

	public String SendCustomeremail(String email, int otp);
	
	public Customer customerProfile(String email);
	
	public Customer UpdataCustomer(String email,String phone,String name,String address,Collection<Part> parts );
	
	public Customer DeleteCustomer(String email);
	
	public Customer UpdatePassword(String email,String Password);
	
}
