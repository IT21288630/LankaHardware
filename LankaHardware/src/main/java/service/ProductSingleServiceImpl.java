package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.TreeMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Item;
import util.CommonConstants;
import util.DBConnectionUtil;

public class ProductSingleServiceImpl implements IProductSingleService{

	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());
	
	@Override
	public Item getProduct(String itemID) {
		// TODO Auto-generated method stub
		
		Item item = new Item();
		
		item.setItemID(itemID);
		
		return item;
	}

	@Override
	public LinkedHashMap<String, Double> getProductSizeAndPriceList(String itemID) {
		// TODO Auto-generated method stub
		
		LinkedHashMap<String, Double> map = new LinkedHashMap<>();
		con = DBConnectionUtil.getDBConnection();
		
		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_SIZES_AND_PRICES);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();
			
			while (rs.next()) {
				map.put(rs.getString(CommonConstants.COLUMN_INDEX_ONE), rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));
			}
			
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
				if (rs != null) {
					rs.close();
				}
				if (st != null) {
					st.close();
				}
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}
		
		return map;
	}

	public static void main(String[] args) {
		IProductSingleService iProductSingleService = new ProductSingleServiceImpl();
		System.out.println(iProductSingleService.getProductSizeAndPriceList("i100"));
	}
}
