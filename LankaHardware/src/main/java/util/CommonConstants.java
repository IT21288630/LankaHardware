package util;

public class CommonConstants {
	
	/** Constant for file path of config.properties */
	public static final String PROPERTY_FILE = "config.properties";

	/** Constant for url key of MySQL database in config.properties */
	public static final String URL = "url";

	/** Constant for user name key of MySQL database in config.properties */
	public static final String USERNAME = "username";

	/** Constant for password key of MySQL database in config.properties */
	public static final String PASSWORD = "password";

	/** Constant for query tag in EmployeeQuery.xml */
	public static final String TAG_NAME = "query";

	/** Constant for query id in EmployeeQuery.xml */
	public static final String ATTRIB_ID = "id";

	/** Constant for driver name key of MySQL database in config.properties */
	public static final String DRIVER_NAME = "driverName";
	
	/** Constant for cart id prefix */
	public static final String CART_ID_PREFIX = "C300";
	
	/** Constant for cart id prefix */
	public static final String WISHLIST_ID_PREFIX = "W300";
	
	/** Constant for select cart id's */
	public static final String QUERY_ID_SELECT_CART_IDS = "select cid from cart;";
	
	/** Constant for create a cart */
	public static final String QUERY_ID_CREATE_CART = "INSERT INTO cart(cid,email) VALUES(?,?);";
	
	/** Constant for add to cart */
	public static final String QUERY_ID_ADD_TO_CART = "INSERT INTO cart_item(cid, itId, qty) VALUES(?, ?, ?);";
	
	/** Constant for get specific cart id */
	public static final String QUERY_ID_GET_SPECIFIC_CART_ID = "SELECT cid FROM cart WHERE email = ?;";
	
	/** Constant for update cart quantity */
	public static final String QUERY_ID_UPDATE_QUANTITY = "UPDATE cart_item SET qty = ? WHERE cid = ? AND itId = ?;";
	
	/** Constant for clear specific item cart */
	public static final String QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_CART = "DELETE FROM cart_item WHERE cid = ? and itId = ?;";
	
	/** Constant for clear cart */
	public static final String QUERY_ID_CLEAR_CART = "DELETE FROM cart_item WHERE cid = ?;";

	/** Constant for get items in cart */
	public static final String QUERY_ID_GET_CART = "SELECT * FROM cart_item WHERE cid = ?;";
	
	/** Constant for select wishlist id's */
	public static final String QUERY_ID_SELECT_WISHLIST_IDS = "select wid from wishlist;";
	
	/** Constant for get specific wishlist id */
	public static final String QUERY_ID_GET_SPECIFIC_WISHLIST_ID = "SELECT wid FROM wishlist WHERE email = ?;";
	
	/** Constant for create a wishlist */
	public static final String QUERY_ID_CREATE_WISHLIST = "INSERT INTO wishlist(wid, email) VALUES(?, ?);";
	
	/** Constant for add to wishlist */
	public static final String QUERY_ID_ADD_TO_WISHLIST = "INSERT INTO wishlist_item(wid, itId) VALUES(?, ?);";
	
	/** Constant for clear specific item from wishlist */
	public static final String QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_WISHLIST = "DELETE FROM wishlist_item WHERE wid = ? and itId = ?;";
	
	/** Constant for get items in wishlist */
	public static final String QUERY_ID_GET_WISHLIST = "SELECT * FROM wishlist_item WHERE wid = ?;";
	
	/** Constant for Column index one */
	public static final int COLUMN_INDEX_ONE = 1;

	/** Constant for Column index two */
	public static final int COLUMN_INDEX_TWO = 2;

	/** Constant for Column index three */
	public static final int COLUMN_INDEX_THREE = 3;

	/** Constant for Column index four */
	public static final int COLUMN_INDEX_FOUR = 4;

	/** Constant for Column index five */
	public static final int COLUMN_INDEX_FIVE = 5;

	/** Constant for Column index six */
	public static final int COLUMN_INDEX_SIX = 6;

	/** Constant for Column index seven */
	public static final int COLUMN_INDEX_SEVEN = 7;

	/** Constant for Column index eight */
	public static final int COLUMN_INDEX_EIGHT = 8;
}
