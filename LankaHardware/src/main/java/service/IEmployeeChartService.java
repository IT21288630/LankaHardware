package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Employee;
import model.Item;

public interface IEmployeeChartService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IEmployeeChartService.class.getName());
	
	/**
	 * get all the items
	 */
	public ArrayList<Employee> getAllEmployees();
}
