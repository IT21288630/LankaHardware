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
import model.Customer;
import model.Item;
import model.Wishlist;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;
import util.DBconnect;

public class CustomerServiceImpl implements ICustomerService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	private static CustomerServiceImpl iCustomerService;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public ArrayList<Customer> getAllCustomers() {
		// TODO Auto-generated method stub

		ArrayList<Customer> customers = new ArrayList();
		con = DBConnectionUtil.getDBConnection();
		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants. QUERY_ID_SELECT_ALL_CUSTOMERS);

			while (rs.next()) {
				Customer customer = new Customer();

				 customer.setEmail(rs.getString(1));
				 customer.setPassword(rs.getString(2));
				 customer.setPhone(rs.getString(3));
				 customer.setAddress(rs.getString(4));
				
			

				customers.add( customer);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return customers;
	}

	@Override
	public String addCustomers( Customer  customer, Collection<Part> parts) {
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
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_CUSTOMER);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, customer.getEmail());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, customer.getPassword());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, customer.getPhone());
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, customer.getAddress());
			

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


	public static void main(String[] args) {
		ICustomerService iCustonerService = new CustomerServiceImpl();
		System.out.println(iCustomerService.removeCustomers("emp9"));
	}

	@Override
	public String removeCustomers(String email) {
		// TODO Auto-generated method stub
		
		Customer customer = new Customer();
		customer.setEmail(email);
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_CUSTOMER);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, customer.getEmail());

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

		return "Customer removed";
	}

	
	
	public String updateCustomer(String email, String Password, String phone , String address) {
		// TODO Auto-generated method stub

		String status = "There was a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_SELECT_ALL_CUSTOMERS);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, email);
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, Password);
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, phone);
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, address);
			pst.executeUpdate();

			status = "Customer Updated";

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
	public String updateCustomers(String email, String PAssword, String phone, String address) {
		// TODO Auto-generated method stub
		return null;
	}

	
	



	
	
	
}
