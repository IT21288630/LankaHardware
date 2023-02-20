package service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.Part;

import org.apache.commons.io.FileUtils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.gson.JsonElement;

import model.Cart;
import model.Employee;
import model.Item;
import model.Wishlist;
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
	
	public static void main(String[] args) {
		IEmployeeService iEmployeeService = new EmployeeServiceImpl();
		iEmployeeService.getAllEmployees();
	}

	@Override
	public String addEmployees(Employee employee, Collection<Part> parts) {
		// TODO Auto-generated method stub
	
		String status = "There was something wrong";
		ArrayList<String> imagePathArrayList = new ArrayList<String>();

		con = DBConnectionUtil.getDBConnection();

		// Configure to upload to cloudinary
		Map config = new HashMap();
		config.put("cloud_name", "dqgiitni2");
		config.put("api_key", "987952682616387");
		config.put("api_secret", "0Zw3qi4VX6XjfMh9LYSDYVdyOns");
		Cloudinary cloudinary = new Cloudinary(config);
		
		for (Part part : parts) {
			if (part.getSubmittedFileName() != null) {

				try {
					InputStream is = part.getInputStream();

					File tempFile = File.createTempFile("javaMyfile", ".xls");
					FileUtils.copyToFile(is, tempFile);

					System.out.println(tempFile.getName());
					System.out.println(tempFile.exists());

					// Upload to cloudinary
					try {
						Map<String, String> map = cloudinary.uploader().upload(tempFile, ObjectUtils.asMap());
						imagePathArrayList.add(map.get("url"));
					} catch (IOException exception) {
						System.out.println(exception.getMessage());
					}

					System.out.println("deleting " + tempFile.getAbsolutePath() + " " + tempFile.delete());
					System.out.println(tempFile.exists());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_EMPLOYEE);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, employee.getEmpNo());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, employee.getName());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, employee.getEmail());
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, employee.getDesignation());
			pst.setString(CommonConstants.COLUMN_INDEX_FIVE, employee.getPhoneNum());
			pst.setString(CommonConstants.COLUMN_INDEX_SIX, employee.getAddress());
			pst.setString(CommonConstants.COLUMN_INDEX_SEVEN, employee.getGender());
			pst.setString(CommonConstants.COLUMN_INDEX_EIGHT, employee.getDate());
			pst.setString(CommonConstants.COLUMN_INDEX_NINE, employee.getWage());
			pst.setDouble(CommonConstants.COLUMN_INDEX_TEN, employee.getSalary());
			
			for (String string : imagePathArrayList) {
				pst.setString(CommonConstants.COLUMN_INDEX_ELEVEN, string);
			}
			
			pst.executeUpdate();
			
			status = "Employee Added";

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

		return status;
	}
	
	public String removeEmployees(String empNo) {
		// TODO Auto-generated method stub

		Employee employee = new Employee();
		employee.setEmpNo(getAllEmployees(empNo));
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_EMPLOYEES);
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

		return "Employees removed";
	}




		
		
	
	
	

}

