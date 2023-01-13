package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Cart;
import model.Wishlist;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;

public class WishlistServiceImpl implements IWishlistService {

	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(WishlistServiceImpl.class.getName());
	
	@Override
	public String getWishlistIdByEmail(String email) {
		// TODO Auto-generated method stub
		
		con = DBConnectionUtil.getDBConnection();
		Wishlist wishlist = new Wishlist();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_SPECIFIC_WISHLIST_ID);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, email);
			rs = pst.executeQuery();
			rs.next();

			wishlist.setWishlistID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));

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
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return wishlist.getWishlistID();
	}

	@Override
	public void createWishlist(String email) {
		// TODO Auto-generated method stub
		
		con = DBConnectionUtil.getDBConnection();
		ArrayList<String> ids = new ArrayList<>();
		Wishlist wishlist = new Wishlist();

		try {
			st = con.createStatement();

			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_CART_IDS);

			while (rs.next()) {
				ids.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			wishlist.setWishlistID(CommonUtil.generateIDs(ids, "wishlist"));

			pst = con.prepareStatement(CommonConstants.QUERY_ID_CREATE_CART);

			pst.setString(CommonConstants.COLUMN_INDEX_ONE, wishlist.getWishlistID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, email);
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
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}
	}

}
