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

	private static PreparedStatement pst;

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
			
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CREATE_CART);
			
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
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

	@Override
	public void addToCart(String email) {
		// TODO Auto-generated method stub

	}

	public static void main(String[] args) {
		ICartService iCartService = new CartServiceImpl();
		
		iCartService.createCart("asfdv");
	}
}
