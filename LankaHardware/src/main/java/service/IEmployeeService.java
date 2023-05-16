package service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

import javax.servlet.http.Part;

import com.google.gson.JsonElement;

import model.CartChart;
import model.Employee;

public interface IEmployeeService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IEmployeeService.class.getName());

	public ArrayList<Employee> getAllEmployees();

	public String addEmployees(Employee employee,Collection<Part> EmployeeImages);

	public String removeEmployees(String empNo);

	public String updateEmployees(String empNo, String name, String email, String designation, String phoneNum, String address, String date,  String salary, Collection<Part> EmployeeImages);

	public ArrayList<Employee> getPresentEmployees();
	
	public String markPresentAttendane(String empNo);
	
	public ArrayList<Integer>getEmployeeAttendanceDetails(String empNo);
	
}