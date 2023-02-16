package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import com.google.gson.JsonElement;

import model.Employee;

public interface IEmployeeService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IEmployeeService.class.getName());

	public ArrayList<Employee> getAllEmployees();

	public String addEmployees(String empNo, String name, String email, String designation, String phoneNum,
			String address, String gender, String date, String wage, Double salary);

}
