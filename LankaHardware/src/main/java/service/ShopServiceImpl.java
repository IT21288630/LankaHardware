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
	public Shop getShop(String itemName) {
		// TODO Auto-generated method stub

		Shop shop = new Shop();
		ArrayList<Item> items = new ArrayList<>();
		ArrayList<String> mainCategories = new ArrayList<>();
		IReviewService iReviewService = new ReviewServiceImpl();
		IProductSingleService iProductSingleService = new ProductSingleServiceImpl();
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEM_DETAILS_FOR_SHOP);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemName);
			rs = pst.executeQuery();
			
			while (rs.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));
				item.setName(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				item.setSize(rs.getString(CommonConstants.COLUMN_INDEX_SIX));
				item.setAvgRating(iReviewService.getAverageRating(item.getItemID()));
				item.setDescription(rs.getString(CommonConstants.COLUMN_INDEX_SEVEN));
				
				items.add(item);
			}

			for (Item item : items) {
				item.setSizesAndPrizes(iProductSingleService.getProductSizeAndPriceList(item.getItemID()));
			}
			
			shop.setItems(items);

			st = con.createStatement();
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
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return shop;
	}

	@Override
	public Shop getCustomizedItemList(String mainCategory, double lowerPrice, double higherPrice, String sortByValue, String itemName, String brand) {
		// TODO Auto-generated method stub

		Shop shop = new Shop();
		ArrayList<Item> items = new ArrayList<>();
		ArrayList<String> brandList = new ArrayList<>();
		IReviewService iReviewService = new ReviewServiceImpl();
		IProductSingleService iProductSingleService = new ProductSingleServiceImpl();
		con = DBConnectionUtil.getDBConnection();

		try {
			if (sortByValue.equals("Price: Low To High")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_PRICE_ASC);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, mainCategory);
				pst.setDouble(CommonConstants.COLUMN_INDEX_TWO, lowerPrice);
				pst.setDouble(CommonConstants.COLUMN_INDEX_THREE, higherPrice);
				pst.setString(CommonConstants.COLUMN_INDEX_FOUR, itemName);
				pst.setString(CommonConstants.COLUMN_INDEX_FIVE, brand);
			} else if (sortByValue.equals("Price: High To Low")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_PRICE_DESC);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, mainCategory);
				pst.setDouble(CommonConstants.COLUMN_INDEX_TWO, lowerPrice);
				pst.setDouble(CommonConstants.COLUMN_INDEX_THREE, higherPrice);
				pst.setString(CommonConstants.COLUMN_INDEX_FOUR, itemName);
				pst.setString(CommonConstants.COLUMN_INDEX_FIVE, brand);
			} else if (sortByValue.equals("Avg. Customer Review")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_RATING_DESC);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, mainCategory);
				pst.setDouble(CommonConstants.COLUMN_INDEX_TWO, lowerPrice);
				pst.setDouble(CommonConstants.COLUMN_INDEX_THREE, higherPrice);
				pst.setString(CommonConstants.COLUMN_INDEX_FOUR, itemName);
				pst.setString(CommonConstants.COLUMN_INDEX_FIVE, brand);
			} else if (sortByValue.equals("Newest Arrivals")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_NEWEST_ARRIVALS);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, mainCategory);
				pst.setDouble(CommonConstants.COLUMN_INDEX_TWO, lowerPrice);
				pst.setDouble(CommonConstants.COLUMN_INDEX_THREE, higherPrice);
				pst.setString(CommonConstants.COLUMN_INDEX_FOUR, itemName);
				pst.setString(CommonConstants.COLUMN_INDEX_FIVE, brand);
			}

			rs = pst.executeQuery();

			while (rs.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));
				item.setName(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				item.setBrand(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				item.setMainImg(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				item.setSize(rs.getString(CommonConstants.COLUMN_INDEX_SIX));
				item.setDescription(rs.getString(CommonConstants.COLUMN_INDEX_SEVEN));
				
				items.add(item);
			}

			for (Item item : items) {
				item.setAvgRating(iReviewService.getAverageRating(item.getItemID()));
				item.setSizesAndPrizes(iProductSingleService.getProductSizeAndPriceList(item.getItemID()));
			}
			
			if(!mainCategory.equals("%%")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_BRAND_LIST_FOR_SHOP);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, mainCategory);
				rs = pst.executeQuery();
				
				while (rs.next()) {
					brandList.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				}
				
				shop.setBrandList(brandList);
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
				} else {
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