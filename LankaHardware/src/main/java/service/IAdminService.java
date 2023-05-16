package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

import javax.servlet.http.Part;

import com.google.gson.JsonElement;

import model.Admin;
import model.Employee;

public interface IAdminService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IAdminService.class.getName());

	public ArrayList<Admin> getAllAdmin();

	public String addAdmin(Admin admin, Collection<Part> parts);

	public String removeAdmin(String Email);

	public String updateAdmins(String Email, String password, String phone, String name, String Address, String Role);

	
	
}
