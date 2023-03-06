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
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}
	}

	@Override
	public String addToCart(String email, String itemID, int quantity, String size) {
		// TODO Auto-generated method stub

		Cart cart = getCart(email);
		String status = "There is a problem";
		
		if (size.equals("notSpecified")) {
			size = getDefaultSizeAndPrice(itemID);
		}

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, itemID);
			pst.setInt(CommonConstants.COLUMN_INDEX_THREE, quantity);
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, size);
			pst.executeUpdate();

			status = "Added to cart";
			
		} catch (SQLIntegrityConstraintViolationException e) {
			// TODO: handle exception

			ArrayList<Item> items = cart.getItems();

			for (Item item : items) {
				if (item.getItemID().equals(itemID) && item.getSize().equals(size)) {
					quantity += item.getQuantity();

					break;
				}
			}

			changeQuantity(email, itemID, quantity, size);
			
			status = "Added to cart";
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
	public void changeQuantity(String email, String itemID, int quantity, String size) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_QUANTITY);
			pst.setInt(CommonConstants.COLUMN_INDEX_ONE, quantity);
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, cart.getCartID());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, itemID);
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, size);
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
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

	}

	@Override
	public String clearOneItemFromCart(String email, String itemID, String size) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));
		String status = "There is a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, itemID);
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, size);
			pst.executeUpdate();

			status = "Removed from cart";
			
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

		return status;
	}

	@Override
	public String clearCart(String email) {
		// TODO Auto-generated method stub

		Cart cart = new Cart();
		cart.setCartID(getCartIdByEmail(email));
		String status = "There is a problem";
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_CART);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, cart.getCartID());
			pst.executeUpdate();

			status = "Cart cleared";
			
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

		return status;
	}

	@Override
	public Cart getCart(String email) {
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
				item.setQuantity(rs.getInt(CommonConstants.COLUMN_INDEX_THREE));
				item.setSize(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));

				items.add(item);
			}

			for (Item item : items) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_OTHER_ITEM_DETAILS_FOR_CART);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, item.getItemID());
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, item.getItemID());
				pst.setString(CommonConstants.COLUMN_INDEX_THREE, item.getSize());
				pst.setString(CommonConstants.COLUMN_INDEX_FOUR, item.getItemID());
				pst.setString(CommonConstants.COLUMN_INDEX_FIVE, item.getSize());
				pst.setString(CommonConstants.COLUMN_INDEX_SIX, item.getItemID());
				rs = pst.executeQuery();
				rs.next();

				item.setName(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				item.setDescription(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_FIVE));
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
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		cart.setItems(items);
		cart.setTotal(calculateTotal(items));

		return cart;
	}

	@Override
	public double calculateTotal(ArrayList<Item> items) {
		// TODO Auto-generated method stub

		double total = CommonConstants.DELIVERY_FEE;

		for (Item item : items) {
			total += item.getPrice() * item.getQuantity();
		}

		return total;
	}

	@Override
	public String getDefaultSizeAndPrice(String itemID) {
		// TODO Auto-generated method stub

		String size = null;
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_DEFAULT_SIZE);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();
			rs.next();

			size = rs.getString(CommonConstants.COLUMN_INDEX_ONE);

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

		return size;
	}

	public static void main(String[] args) {
		ICartService iCartService = new CartServiceImpl();
		Cart cart = iCartService.getCart("a@g.m");
		
		System.out.println(cart.getCartID());
		System.out.println(cart.getTotal());
		
		ArrayList<Item> items = cart.getItems();
		
		System.out.println();
		
		for (Item item : items) {
			System.out.println(item.getBrand());
		}
	}
}
