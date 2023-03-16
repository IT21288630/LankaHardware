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
import java.util.Iterator;
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

public class IStockServiceImpl implements IStockService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	private static IStockServiceImpl iStockService;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public ArrayList<Item> getAllStockItems() {
		// TODO Auto-generated method stub

		ArrayList<Item> items = new ArrayList();
		con = DBConnectionUtil.getDBConnection();
		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants. QUERY_ID_SELECT_ALL_CUSTOMERS);

			while (rs.next()) {
				Item item = new Item();

				 item.setEmail(rs.getString(1));
				 item.setPassword(rs.getString(2));
				 item.setPhone(rs.getString(3));
				 item.setAddress(rs.getString(4));
				
			

				items.add( item);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return items;
	}

	@Override
	public String register( Item  item) {
		// TODO Auto-generated method stub

		String status = "There was something wrong";

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_CUSTOMER);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, customer.getEmail());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, customer.getPassword());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, customer.getPhone());
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, customer.getAddress());

			pst.executeUpdate();

			status = "login.jsp";

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
	public String updateCustomers(String email, String Password, String phone, String address) {
		// TODO Auto-generated method stub
		return null;
	}

	
	



	public static void main(String[] args) {
		ICustomerService customerService = new IStockServiceImpl();
		
		Customer customer = new Customer();
		customer.setAddress("sdfsd");
		customer.setEmail("dfs");
		customer.setPassword("dcs");
		customer.setPhone("dvs");
		
		System.out.println(customerService.register(customer));
		
	}

	@Override
	public ArrayList<Item> getAllSuppliers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String addStockItems(Item item) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String removeStockItems(String itemID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String updateStockItems(String p_name, String cat, String Brand, int U_price, String Des, String mf,
			String exp, String Warranty) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
