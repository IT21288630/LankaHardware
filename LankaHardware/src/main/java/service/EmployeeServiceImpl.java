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
				employee.setProfile(rs.getString(11));
				employees.add(employee);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return employees;
	}

	@Override
	public String addEmployees(Employee employee, Collection<Part> EmployeeImages) {
		// TODO Auto-generated method stub

		String status = "There was something wrong";
		ArrayList<String> imagePathArrayList = new ArrayList<String>();
		ArrayList<String> empIds = new ArrayList<String>();

		con = DBConnectionUtil.getDBConnection();

		// Configure to upload to cloudinary
		Map config = new HashMap();
		config.put("cloud_name", "dqgiitni2");
		config.put("api_key", "987952682616387");
		config.put("api_secret", "0Zw3qi4VX6XjfMh9LYSDYVdyOns");
		Cloudinary cloudinary = new Cloudinary(config);

		for (Part part : EmployeeImages) {
			if (part.getSubmittedFileName() != null) {

				try {
					InputStream is = part.getInputStream();

					File tempFile = File.createTempFile("javaMyfile", ".xls");
					FileUtils.copyToFile(is, tempFile);

					// Upload to cloudinary
					try {
						Map<String, String> map = cloudinary.uploader().upload(tempFile, ObjectUtils.asMap());
						imagePathArrayList.add(map.get("url"));
					} catch (IOException exception) {
						System.out.println(exception.getMessage());
					}

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		System.out.println(imagePathArrayList.get(0));

		employee.setProfile(imagePathArrayList.get(0));

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_EMPLOYEE_IDS);

			while (rs.next()) {
				empIds.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			employee.setEmpNo(CommonUtil.generateIDs(empIds, "employee"));

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
			pst.setString(CommonConstants.COLUMN_INDEX_ELEVEN, employee.getProfile());

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

	public static void main(String[] args) {
		IEmployeeService iEmployeeService = new EmployeeServiceImpl();
		System.out.println(iEmployeeService.removeEmployees("emp9"));
	}

	@Override
	public String removeEmployees(String empNo) {
		// TODO Auto-generated method stub

		Employee employee = new Employee();
		employee.setEmpNo(empNo);
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_EMPLOYEES);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, employee.getEmpNo());

			pst.executeUpdate();

			System.out.println("done");

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

	public String updateEmployees(String empNo, String name, String email, String designation, String phoneNum,
			String address, String date, String salary, Collection<Part> EmployeeImages) {
		// TODO Auto-generated method stub

		ArrayList<String> imagePathArrayList = new ArrayList<String>();

		// Configure to upload to cloudinary
		Map config = new HashMap();
		config.put("cloud_name", "dqgiitni2");
		config.put("api_key", "987952682616387");
		config.put("api_secret", "0Zw3qi4VX6XjfMh9LYSDYVdyOns");
		Cloudinary cloudinary = new Cloudinary(config);

		for (Part part : EmployeeImages) {
			if (part.getSubmittedFileName() != null) {

				try {
					InputStream is = part.getInputStream();

					File tempFile = File.createTempFile("javaMyfile", ".xls");
					FileUtils.copyToFile(is, tempFile);

					// Upload to cloudinary
					try {
						Map<String, String> map = cloudinary.uploader().upload(tempFile, ObjectUtils.asMap());
						imagePathArrayList.add(map.get("url"));
					} catch (IOException exception) {
						System.out.println(exception.getMessage());
					}

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		String status = "There was a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			if (!name.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_NAME);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, name);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}
			if (!email.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_EMAIL);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, email);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}
			if (!designation.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_DESIGNATION);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, designation);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}
			if (!phoneNum.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_PHONENUM);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, phoneNum);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}
			if (!address.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_ADDRESS);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, address);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}

			if (!date.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_DATE);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, date);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}

			if (!salary.equals("null")) {
				double sal = Double.parseDouble(salary);
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_SALARY);
				pst.setDouble(CommonConstants.COLUMN_INDEX_ONE, sal);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}

			if (!imagePathArrayList.get(0).equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_EMPLOYEES_PROFILE_PIC);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, imagePathArrayList.get(0));
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);
				pst.executeUpdate();
			}

			status = "Employees Updated";

		} catch (SQLException e) {
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

		return status;
	}

	@Override
	public ArrayList<Employee> getPresentEmployees() {

		ArrayList<Employee> presentEmployees = new ArrayList();
		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_PRESENT_EMPLOYEE);

			while (rs.next()) {
				Employee employee = new Employee();

				employee.setEmpNo(rs.getString(1));
				employee.setName(rs.getString(2));

				presentEmployees.add(employee);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return presentEmployees;
	}

	@Override
	public String markPresentAttendane(String empNo) {

		con = DBConnectionUtil.getDBConnection();

		ArrayList<String> attendanceNo = new ArrayList();
		
		String status = "Error";

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_ATTENDANCE_IDS);

			while (rs.next()) {
				attendanceNo.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			pst = con.prepareStatement(CommonConstants.QUERY_ID_INSERT_EMPLOYEE_ATTENDANCE);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, CommonUtil.generateIDs(attendanceNo, "attendance"));
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, empNo);

			pst.executeUpdate();

			status = "Attendance Marked";

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
		return status;
	}

}
