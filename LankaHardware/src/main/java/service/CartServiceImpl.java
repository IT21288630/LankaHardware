package service;

import java.sql.*;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Cart;
import model.Item;
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
	public String getCartIdByEmail(String email) {
		// TODO Auto-generated method stub

		con = DBConnectionUtil.getDBConnection();
		Cart cart = new Cart();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_SPECIFIC_CART_ID);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, email);
			rs = pst.executeQuery();
			rs.next();

			cart.setCartID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));

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

		return cart.getCartID();
	}

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
	public void addToCart(String email, String itemID, int quantity) {
		// TODO Auto-generated method stub

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, getCartIdByEmail(email));
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, itemID);
			pst.setInt(CommonConstants.COLUMN_INDEX_THREE, quantity);
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
	public void changeQuantity(String email, String itemID, int quantity) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_QUANTITY);
			pst.setInt(CommonConstants.COLUMN_INDEX_ONE, quantity);
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, cart.getCartID());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, itemID);
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
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

	}

	@Override
	public void clearOneItemFromCart(String email, String itemID) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, itemID);
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
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

	}

	@Override
	public void clearCart(String email) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
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
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

	}

	@Override
	public ArrayList<Item> getCart(String email) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));

		con = DBConnectionUtil.getDBConnection();
		ArrayList<Item> items = new ArrayList<>();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			rs = pst.executeQuery();

			while (rs.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				
				items.add(item);
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
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		cart.setItems(items);

		return null;
	}

	public static void main(String[] args) {
		ICartService iCartService = new CartServiceImpl();

		iCartService.getCart("a@g.m");
	}
}
