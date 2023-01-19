package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Cart;
import model.Item;
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
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_WISHLIST_IDS);

			while (rs.next()) {
				ids.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			wishlist.setWishlistID(CommonUtil.generateIDs(ids, "wishlist"));

			pst = con.prepareStatement(CommonConstants.QUERY_ID_CREATE_WISHLIST);

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

	@Override
	public String addToWishlist(String email, String itemID) {
		// TODO Auto-generated method stub

		Wishlist wishlist = new Wishlist();
		wishlist.setWishlistID(getWishlistIdByEmail(email));
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_WISHLIST);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, wishlist.getWishlistID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, itemID);
			pst.executeUpdate();

		} catch (SQLIntegrityConstraintViolationException e) {
			// TODO: handle exception

			return "Item is already in whislist";
		}

		catch (SQLException e) {
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
		return "Added to wishlist";
	}

	@Override
	public String removeFromWishlist(String email, String itemID) {
		// TODO Auto-generated method stub

		Wishlist wishlist = new Wishlist();
		wishlist.setWishlistID(getWishlistIdByEmail(email));
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_WISHLIST);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, wishlist.getWishlistID());
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

		return "Item removed";
	}

	@Override
	public ArrayList<Item> getWishlist(String email) {
		// TODO Auto-generated method stub

		Wishlist wishlist = new Wishlist();
		wishlist.setWishlistID(getWishlistIdByEmail(email));

		con = DBConnectionUtil.getDBConnection();
		ArrayList<Item> items = new ArrayList<>();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_WISHLIST);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, wishlist.getWishlistID());
			rs = pst.executeQuery();

			while (rs.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_TWO));

				items.add(item);
			}

			for (Item item : items) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_OTHER_ITEM_DETAILS_FOR_WISHLIST);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, item.getItemID());
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, item.getItemID());
				rs = pst.executeQuery();
				rs.next();

				item.setName(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_FOUR));
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

		wishlist.setItems(items);

		return wishlist.getItems();
	}

	public static void main(String[] args) {
		IWishlistService iWishlistService = new WishlistServiceImpl();

		System.out.println(iWishlistService.getWishlist("a@g.m"));
	}
}
