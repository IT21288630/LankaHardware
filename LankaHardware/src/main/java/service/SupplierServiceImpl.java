package service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

import model.Supplier;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;

public class SupplierServiceImpl implements ISupplierService {
	
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public ArrayList<Supplier> getAllSuppliers() {
		// TODO Auto-generated method stub

		ArrayList<Supplier> suppliers = new ArrayList();
		con = DBConnectionUtil.getDBConnection();
		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_SUPPLIERS);

			while (rs.next()) {
				Supplier supplier = new Supplier();

				supplier.setSupNo(rs.getString(1));
				supplier.setName(rs.getString(2));
				supplier.setEmail(rs.getString(3));
				supplier.setPhoneNum(rs.getString(4));
				supplier.setDescription(rs.getString(5));
				supplier.setDebit(rs.getString(6));
			

				suppliers.add(supplier);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return suppliers;
	}

	@Override
	public String addSuppliers(Supplier supplier) {
		// TODO Auto-generated method stub

		String status = "There was something wrong";
		
		con = DBConnectionUtil.getDBConnection();
		
		ArrayList<String> supIds = new ArrayList();
			
		try {
			st = con.createStatement();
			rs= st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_SUPPLIER_IDS);
			
			while (rs.next()) {
				supIds.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}
			
			supplier.setSupNo(CommonUtil.generateIDs(supIds, "supplier"));
			
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_SUPPLIER);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, supplier.getSupNo());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, supplier.getName());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, supplier.getEmail());
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, supplier.getPhoneNum());
			pst.setString(CommonConstants.COLUMN_INDEX_FIVE, supplier.getDescription());
			pst.setString(CommonConstants.COLUMN_INDEX_SIX, supplier.getDebit());
			


			pst.executeUpdate();

			status = "Supplier Added";

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


	public static void main(String[] args) {
		ISupplierService iSupplierService = new SupplierServiceImpl();
		System.out.println(iSupplierService.removeSuppliers("emp9"));
	}

	@Override
	public String removeSuppliers(String supNo) {
		// TODO Auto-generated method stub
		
		Supplier supplier = new Supplier();
		supplier.setSupNo(supNo);
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_SUPPLIERS);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, supplier.getSupNo());

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

		return "Supplier removed";
	}

	
	
	public String updateSuppliers(String supNo, String name, String email, String description, String debit) {
		// TODO Auto-generated method stub

		String status = "There was a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			if(!name.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_SUPPLIERS_NAME);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, name);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, supNo);
				pst.executeUpdate();
			}
			if(!email.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_SUPPLIERS_EMAIL);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, email);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, supNo);
				pst.executeUpdate();
			}
			if(!description.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_SUPPLIERS_DESCRIPTION);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, description);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, supNo);
				pst.executeUpdate();
			}
			if(!debit.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_SUPPLIERS_DEBIT);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, debit);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, supNo);
				pst.executeUpdate();
			}
		
			
		
			

			status = "Suppliers Updated";

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


}


