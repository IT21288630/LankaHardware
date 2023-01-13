package service;

import java.sql.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Cart;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionUtil;

public class CartServiceImpl implements ICartService {

	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst1, pst2;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(CartServiceImpl.class.getName());

	@Override
	public void createCart(String email) {
		// TODO Auto-generated method stub

		con = DBConnectionUtil.getDBConnection();
		ArrayList<String> ids = new ArrayList<>();
		Cart cart = new Cart();

		try {
			st = con.createStatement();

			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_CART_IDS);

			while (rs.next()) {
				ids.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			cart.setCartID(CommonUtil.generateIDs(ids, "cart"));

			pst1 = con.prepareStatement(CommonConstants.QUERY_ID_CREATE_CART);

			pst1.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			pst1.setString(CommonConstants.COLUMN_INDEX_TWO, email);

			pst1.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			log.log(Level.SEVERE, e.getMessage());
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst1 != null) {
					pst1.close();
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

	@Override
	public void addToCart(String email, String itemID, int quantity) {
		// TODO Auto-generated method stub

		con = DBConnectionUtil.getDBConnection();
		Cart cart = new Cart();

		try {
			pst1 = con.prepareStatement(CommonConstants.QUERY_ID_GET_SPECIFIC_CART_ID);
			pst1.setString(CommonConstants.COLUMN_INDEX_ONE, email);
			rs = pst1.executeQuery();
			rs.next();
			
			cart.setCartID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			
			pst2 = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_CART);
			pst2.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			pst2.setString(CommonConstants.COLUMN_INDEX_TWO, itemID);
			pst2.setInt(CommonConstants.COLUMN_INDEX_THREE, quantity);
			pst2.executeUpdate();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			log.log(Level.SEVERE, e.getMessage());
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (pst1 != null) {
					pst1.close();
				}
				if (pst2 != null) {
					pst2.close();
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

	public static void main(String[] args) {
		ICartService iCartService = new CartServiceImpl();

		iCartService.addToCart("a@g.m", "I200", 10);
	}
}
