package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Item;
import model.Shop;
import util.CommonConstants;
import util.DBConnectionUtil;

public class ShopServiceImpl implements IShopService {

	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IndexServiceImpl.class.getName());

	@Override
	public Shop getShop() {
		// TODO Auto-generated method stub

		Shop shop = new Shop();
		ArrayList<Item> items = new ArrayList<>();
		ArrayList<String> mainCategories = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_ITEM_DETAILS_FOR_SHOP);

			while (rs.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));
				item.setName(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));

				items.add(item);
			}

			shop.setItems(items);

			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_MAIN_CATEGORIES_FOR_SHOP);
			rs.next();

			while (rs.next()) {
				mainCategories.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}

			shop.setMainCategories(mainCategories);

			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_MAX_AND_MIN_ITEM_PRICE_FOR_SHOP);
			rs.next();

			shop.setHighestPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_ONE));
			shop.setLowestPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));

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

		return shop;
	}

	@Override
	public Shop getItemsByMainCategory(String mainCategory, double lowerPrice, double higherPrice) {
		// TODO Auto-generated method stub

		Shop shop = new Shop();
		ArrayList<Item> items = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, mainCategory);
			pst.setDouble(CommonConstants.COLUMN_INDEX_TWO, lowerPrice);
			pst.setDouble(CommonConstants.COLUMN_INDEX_THREE, higherPrice);
			rs = pst.executeQuery();

			while (rs.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));
				item.setName(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));

				items.add(item);
			}

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

		shop.setItems(items);

		return shop;
	}

	@Override
	public ArrayList<String> getItemSizeList(String itemID) {
		// TODO Auto-generated method stub

		ArrayList<String> sizeList = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEM_SIZE_LIST_FOR_SHOP);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();

			while (rs.next()) {
				String temp = rs.getString(CommonConstants.COLUMN_INDEX_ONE);

				if (Character.isDigit(temp.charAt(0))) {
					if (temp.length() < 2) {
						sizeList.add(temp);
					} else {
						sizeList.add(temp.substring(0, 2));
					}
				}
				else {
					if (temp.length() < 1) {
						sizeList.add(temp);
					} else {
						sizeList.add(temp.substring(0, 1));
					}
				}
			}

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

		return sizeList;
	}

	public static void main(String[] args) {
		IShopService iShopService = new ShopServiceImpl();
		System.out.println(iShopService.getItemSizeList("i100"));
	}
}