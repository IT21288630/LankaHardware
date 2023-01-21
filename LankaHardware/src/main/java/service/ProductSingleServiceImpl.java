package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Item;
import util.CommonConstants;
import util.DBConnectionUtil;

public class ProductSingleServiceImpl implements IProductSingleService {

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
		LinkedHashMap<String, Double> map = getProductSizeAndPriceList(itemID);
		IReviewService iReviewService = new ReviewServiceImpl();
		
		item.setSize(map.entrySet().iterator().next().getKey()); 
		item.setItemID(itemID);
		
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_OTHER_ITEM_DETAILS_FOR_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, item.getItemID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, item.getItemID());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, item.getSize());
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, item.getItemID());
			rs = pst.executeQuery();
			rs.next();

			item.setName(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
			item.setDescription(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
			item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
			item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_FIVE));
			item.setAvgRating(iReviewService.getAverageRating(itemID));
			
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
		LinkedHashMap<String, Double> map = iProductSingleService.getProductSizeAndPriceList("i100");
		
		System.out.println(map.entrySet().iterator().next().getKey());
	}
}
