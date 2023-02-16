package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.gson.JsonElement;

import model.Cart;
import model.Employee;
import model.Item;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;
import util.DBconnect;

public class EmployeeServiceImpl implements IEmployeeService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public ArrayList<Employee> getAllEmployees() {
		// TODO Auto-generated method stub

		ArrayList<Employee> employees = new ArrayList();
		con = DBConnectionUtil.getDBConnection();
		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_EMPLOYEES);

			while (rs.next()) {
				Employee employee = new Employee();
				
				employee.setEmpNo(rs.getString(1));
				employee.setName(rs.getString(2));
				employee.setEmail(rs.getString(3));
				employee.setDesignation(rs.getString(4));
				employee.setPhoneNum(rs.getString(5));
				employee.setAddress(rs.getString(6));
				employee.setGender(rs.getString(7));
				employee.setDate(rs.getString(8));
				employee.setWage(rs.getString(9));
				employee.setSalary(rs.getDouble(10));
				
				employees.add(employee);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return employees;
	}
	
	public void createEmployee(String email) {
		// TODO Auto-generated method stub

		con = DBConnectionUtil.getDBConnection();
		ArrayList<String> empNo = new ArrayList<>();
		Employee employee = new Employee();

		try {
			st = con.createStatement();

			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_EMPLOYEE_IDS);

			while (rs.next()) {
				empNo.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			empNo.setEmpNo(CommonUtil.generateIDs(empNo, "employee"));

			pst = con.prepareStatement(CommonConstants.QUERY_ID_CREATE_EMPLOYEE);

			pst.setString(CommonConstants.COLUMN_INDEX_ONE, employee.getEmpNo());
			
			pst.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			log.log(Level.SEVERE, e.getMessage());
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}
	}


	public static void main(String[] args) {
		IEmployeeService iEmployeeService = new EmployeeServiceImpl();
		iEmployeeService.getAllEmployees();
	}

	@Override
	public String addEmployees(String empNo, String name, String email, String designation, String phoneNum,
			String address, String gender, String date, String wage, Double salary) {
		// TODO Auto-generated method stub
		
		Employee employee = getEmployee(empNo);
		
		

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_EMPLOYEE);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, employee.getEmpNo());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, name);
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, email);
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, designation);
			pst.setString(CommonConstants.COLUMN_INDEX_FIVE, phoneNum);
			pst.setString(CommonConstants.COLUMN_INDEX_SIX, address);
			pst.setString(CommonConstants.COLUMN_INDEX_SEVEN, gender);
			pst.setString(CommonConstants.COLUMN_INDEX_EIGHT, date);
			pst.setString(CommonConstants.COLUMN_INDEX_NINE, wage);
			pst.setDouble(CommonConstants.COLUMN_INDEX_TEN, salary);
			pst.executeUpdate();

		} catch (SQLIntegrityConstraintViolationException e) {
			// TODO: handle exception

			ArrayList<Employee> employees = employees.getEmployees();

			for (Employee employeess : employees) {
				if (employeess.getEmpNo().equals(empNo)) {
					empNo += employees.getEmployees(); 

					break;
				}
			}

			changeEmployees(empNo, name, email, designation, phoneNum,  address, gender, date, wage, salary);
		}

		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst != null) {
					pst.close();
				}
				if (rs != null) {
					rs.close();
				}
				if (st != null) {
					st.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return "Employee Added";
	}


		
		
	
	
	

}

