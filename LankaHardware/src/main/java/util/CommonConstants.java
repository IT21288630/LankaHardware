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
	
	/** Constant for item id prefix */
	public static final String ITEM_ID_PREFIX = "I300";
	
	/** Constant for delivery fee */
	public static final double DELIVERY_FEE = 200;
	
	/** Constant for select cart id's */
	public static final String QUERY_ID_SELECT_CART_IDS = "select cid from cart;";
	
	/** Constant for create a cart */
	public static final String QUERY_ID_CREATE_CART = "INSERT INTO cart(cid,email) VALUES(?,?);";
	
	/** Constant for add to cart */
	public static final String QUERY_ID_ADD_TO_CART = "INSERT INTO cart_item(cid, itId, qty, size) VALUES(?, ?, ?, ?);";
	
	/** Constant for get specific cart id */
	public static final String QUERY_ID_GET_SPECIFIC_CART_ID = "SELECT cid FROM cart WHERE email = ?;";
	
	/** Constant for update cart quantity */
	public static final String QUERY_ID_UPDATE_QUANTITY = "UPDATE cart_item SET qty = ? WHERE cid = ? AND itId = ? AND size = ?;";
	
	/** Constant for clear specific item cart */
	public static final String QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_CART = "DELETE FROM cart_item WHERE cid = ? AND itId = ? AND size = ?;";
	
	/** Constant for clear cart */
	public static final String QUERY_ID_CLEAR_CART = "DELETE FROM cart_item WHERE cid = ?;";

	/** Constant for get items in cart */
	public static final String QUERY_ID_GET_CART = "SELECT * FROM cart_item WHERE cid = ?;";
	
	/** Constant for get default size */
	public static final String QUERY_ID_GET_DEFAULT_SIZE = "SELECT size FROM item_size WHERE Id = ? ORDER BY unit_price LIMIT 1;";
	
	/** Constant for get items sizes and relevant prices */
	public static final String QUERY_ID_GET_SIZES_AND_PRICES = "SELECT size, unit_price FROM item_size WHERE Id = ? ORDER BY unit_price;";
	
	/** Constant for get other item details for cart */
	public static final String QUERY_ID_GET_OTHER_ITEM_DETAILS_FOR_CART = "SELECT name, brand, description, (SELECT img FROM item_img WHERE Id = ? limit 1) as 'img', (SELECT unit_price FROM item_size WHERE id = ? and size = ?) as 'price' FROM item WHERE id = ?;";
	
	/** Constant for select wishlist id's */
	public static final String QUERY_ID_SELECT_WISHLIST_IDS = "select wid from wishlist;";
	
	/** Constant for get specific wishlist id */
	public static final String QUERY_ID_GET_SPECIFIC_WISHLIST_ID = "SELECT wid FROM wishlist WHERE email = ?;";
	
	/** Constant for create a wishlist */
	public static final String QUERY_ID_CREATE_WISHLIST = "INSERT INTO wishlist(wid, email) VALUES(?, ?);";
	
	/** Constant for add to wishlist */
	public static final String QUERY_ID_ADD_TO_WISHLIST = "INSERT INTO wishlist_item(wid, itId) VALUES(?, ?);";
	
	/** Constant for clear specific item from wishlist */
	public static final String QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_WISHLIST = "DELETE FROM wishlist_item WHERE wid = ? AND itId = ?;";
	
	/** Constant for get items in wishlist */
	public static final String QUERY_ID_GET_WISHLIST = "SELECT * FROM wishlist_item WHERE wid = ?;";
	
	/** Constant for get other item details for wishlist */
	public static final String QUERY_ID_GET_OTHER_ITEM_DETAILS_FOR_WISHLIST = "SELECT name, brand, img, (SELECT min(unit_price) FROM item_size where id = ?) as 'price' FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.id = ? GROUP BY i.id;";
	
	/** Constant for get new arrivals */
	public static final String QUERY_ID_GET_NEW_ARRIVALS = "SELECT name, brand, img FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id GROUP BY i.id ORDER BY i.id DESC limit 8;";
	
	/** Constant for get minimum price for new arrivals */
	public static final String QUERY_ID_GET_MINIMUM_PRICE = "SELECT id, min(unit_price) FROM item_size GROUP BY id ORDER BY id DESC;";
	
	/** Constant for get main search results */
	public static final String QUERY_ID_GET_MAIN_SEARCH_RESULTS = "SELECT id, name, description FROM item WHERE name LIKE ?;";
	
	/** Constant for get images for main search results */
	public static final String QUERY_ID_GET_MAIN_SEARCH_RESULTS_IMAGES = "select img from item_img where Id = ? limit 1;";
	
	/** Constant for add a review */
	public static final String QUERY_ID_ADD_REVIEW = "INSERT INTO reviews(itID, email, description, stars, date)VALUES(?,?,?,?,CURDATE());";
	
	/** Constant for get items for shop page */
	public static final String QUERY_ID_GET_ITEM_DETAILS_FOR_SHOP = "SELECT i.id, min(s.unit_price), name, brand, img FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id GROUP BY i.id ORDER BY s.unit_price;";
	
	/** Constant for get main categories for shop page */
	public static final String QUERY_ID_GET_MAIN_CATEGORIES_FOR_SHOP = "SELECT type FROM item;";
	
	/** Constant for get maximum item price and minimum item price */
	public static final String QUERY_ID_GET_MAX_AND_MIN_ITEM_PRICE_FOR_SHOP = "SELECT max(unit_price), min(unit_price) FROM item_size;";
	
	/** Constant for get main categories for shop page order by price asc */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_PRICE_ASC = "SELECT i.id, min(s.unit_price), name, brand, img, s.size  FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type like ? and s.unit_price BETWEEN ? AND ? GROUP BY i.id ORDER BY s.unit_price;";
	
	/** Constant for get main categories for shop page order by price desc */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_PRICE_DESC = "SELECT i.id, min(s.unit_price), name, brand, img, s.size  FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type like ? and s.unit_price BETWEEN ? AND ? GROUP BY i.id ORDER BY s.unit_price DESC;";
	
	/** Constant for get main categories for shop page newest arrivals */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_NEWEST_ARRIVALS = "SELECT i.id, min(s.unit_price), name, brand, img, s.size  FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type like ? and s.unit_price BETWEEN ? AND ? GROUP BY i.id ORDER BY i.id DESC;";
	
	/** Constant for get main categories for shop page ratings desc */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_RATING_DESC = "SELECT i.id, min(s.unit_price), name, brand, img, s.size  FROM item i, item_img img, item_size s, review r where i.id = img.id and i.id = s.id and i.id = r.ItID and i.type like ? and s.unit_price BETWEEN ? AND ? GROUP BY i.id ORDER BY avg(r.stars) DESC;";
	
	/** Constant for get item size list for shop page */
	public static final String QUERY_ID_GET_ITEM_SIZE_LIST_FOR_SHOP = "select size from item_size where Id = ? order by unit_price;";
	
	/** Constant for get average item rating */
	public static final String QUERY_ID_GET_ITEM_AVERAGE_RATING = "select avg(stars) from review where itID = ?;";
	
	/** Constant for get rating count for an item */
	public static final String QUERY_ID_GET_ITEM_RATING_COUNT = "select count(reviewID) from review where ItID = ?;";
	
	/** Constant for get details for rating percentage for an item */
	public static final String QUERY_ID_GET_DETAILS_FOR_ITEM_RATING_PERCENTAGE = "select stars from review where ItID = ?;";
	
	/** Constant for get all ratings for an item */
	public static final String QUERY_ID_GET_ALL_RATINGS_FOR_AN_ITEM = "SELECT reviewID, email, description, stars, date FROM review where ItID = ?;";
	
	/** Constant for get rating images for an item */
	public static final String QUERY_ID_GET_RATING_IMAGES_FOR_AN_ITEM = "SELECT img FROM review_img where reviewID = ?;";
	
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
	
	
	/*---------------------------------------------------
	 * 
	 * 
	 * 
	 */
	/** Constant for get item by id */
	public static final String QUERY_ID_GET_ITEM_BY_ID = "SELECT * FROM item i, item_img img, item_size size where i.id = img.Id and i.id = size.Id and i.id = ?;";
	
	
}
