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
	
	/** Constant for review id prefix */
	public static final String REVIEW_ID_PREFIX = "R300";
	
	/** Constant for item id prefix */
	public static final String ITEM_ID_PREFIX = "I300";
	
	/** Constant for question id prefix */
	public static final String QUESTION_ID_PREFIX = "Q300";
	
	/** Constant for delivery fee */
	public static final double DELIVERY_FEE = 200;
	
	/** Constant for select cart id's */
	public static final String QUERY_ID_LOGIN = "SELECT * FROM customerlogin where email=? and Password=?;";
	
	/** Constant for select cart id's */
	public static final String QUERY_ID_LOGIN_ADMIN = "SELECT * FROM admin where Email=? and password=?;";
	
	
	/** Constant for select cart id's */
	public static final String QUERY_ID_SELECT_CART_IDS = "SELECT cid FROM cart;";
	
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
	public static final String QUERY_ID_ADD_TO_WISHLIST = "INSERT INTO wishlist_item(wid, itId, size) VALUES(?, ?, ?);";
	
	/** Constant for clear specific item from wishlist */
	public static final String QUERY_ID_CLEAR_SPECIFIC_ITEM_FROM_WISHLIST = "DELETE FROM wishlist_item WHERE wid = ? AND itId = ? AND size = ?;";
	
	/** Constant for get items in wishlist */
	public static final String QUERY_ID_GET_WISHLIST = "SELECT * FROM wishlist_item WHERE wid = ?;";
	
	/** Constant for get other item details for wishlist */
	public static final String QUERY_ID_GET_OTHER_ITEM_DETAILS_FOR_WISHLIST = "SELECT name, brand, img, (SELECT min(unit_price) FROM item_size where id = ?) as 'price' FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.id = ? GROUP BY i.id;";
	
	/** Constant for get emails of customers for wishlist */
	public static final String QUERY_ID_GET_CUSTOMER_EMAILS_FOR_WISHLIST = "SELECT w.email FROM wishlist w, wishlist_item wi WHERE w.wid = wi.wid AND wi.itId = ?;";
	
	/** Constant for get items in wishlist */
	public static final String QUERY_ID_GET_EMAILED_WISHLIST_ITEM_DETAILS = "SELECT name, (SELECT img FROM item_img where Id = ? limit 1) as 'image' FROM item WHERE id = ?;";
	
	/** Constant for get new arrivals */
	public static final String QUERY_ID_GET_NEW_ARRIVALS = "SELECT name, brand, img, description FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id GROUP BY i.id ORDER BY i.id DESC limit 8;";
	
	/** Constant for get minimum price for new arrivals */
	public static final String QUERY_ID_GET_MINIMUM_PRICE = "SELECT id, min(unit_price) FROM item_size GROUP BY id ORDER BY id DESC;";
	
	/** Constant for get related items for product single page */
	public static final String QUERY_ID_GET_RELATED_ITEMS = "SELECT i.id, min(s.unit_price), name, brand, img, s.size FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type = (select type from item where id = ?) and i.id != ? GROUP BY i.id ORDER BY s.unit_price;";
	
	/** Constant for get main search results */
	public static final String QUERY_ID_GET_MAIN_SEARCH_RESULTS = "SELECT id, name, description FROM item WHERE name LIKE ?;";
	
	/** Constant for get images for main search results */
	public static final String QUERY_ID_GET_MAIN_SEARCH_RESULTS_IMAGES = "SELECT img FROM item_img WHERE Id = ? LIMIT 1;";
	
	/** Constant for select review ids */
	public static final String QUERY_ID_SELECT_REVIEW_IDS = "SELECT reviewID FROM review";
	
	/** Constant for add a review */
	public static final String QUERY_ID_ADD_REVIEW = "INSERT INTO review(reviewID, email, ItID, description, stars, date) VALUES(?, ?, ?, ?, ?, CURDATE());";
	
	/** Constant for add review images */
	public static final String QUERY_ID_ADD_REVIEW_IMAGES = "INSERT INTO review_img(reviewID, img) VALUES(?, ?);";
	
	/** Constant for get items for shop page */
	public static final String QUERY_ID_GET_ITEM_DETAILS_FOR_SHOP = "SELECT i.id, min(s.unit_price), name, brand, img, s.size, i.description FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.name LIKE ? GROUP BY i.id ORDER BY s.unit_price;";
	
	/** Constant for get main categories for shop page */
	public static final String QUERY_ID_GET_MAIN_CATEGORIES_FOR_SHOP = "SELECT type FROM item;";
	
	/** Constant for get maximum item price and minimum item price */
	public static final String QUERY_ID_GET_MAX_AND_MIN_ITEM_PRICE_FOR_SHOP = "SELECT max(unit_price), min(unit_price) FROM item_size;";
	
	/** Constant for get main categories for shop page order by price asc */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_PRICE_ASC = "SELECT i.id, min(s.unit_price), name, brand, img, s.size, i.description FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type like ? and s.unit_price BETWEEN ? AND ? AND i.name LIKE ? AND i.brand LIKE ? GROUP BY i.id ORDER BY s.unit_price;";
	
	/** Constant for get main categories for shop page order by price desc */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_PRICE_DESC = "SELECT i.id, min(s.unit_price), name, brand, img, s.size, i.description FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type like ? and s.unit_price BETWEEN ? AND ? AND i.name LIKE ? AND i.brand LIKE ? GROUP BY i.id ORDER BY s.unit_price DESC;";
	
	/** Constant for get main categories for shop page newest arrivals */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_NEWEST_ARRIVALS = "SELECT i.id, min(s.unit_price), name, brand, img, s.size, i.description FROM item i, item_img img, item_size s where i.id = img.id and i.id = s.id and i.type like ? and s.unit_price BETWEEN ? AND ? AND i.name LIKE ? AND i.brand LIKE ? GROUP BY i.id ORDER BY i.id DESC;";
	
	/** Constant for get main categories for shop page ratings desc */
	public static final String QUERY_ID_GET_ITEMS_BY_MAIN_CATEGORY_RATING_DESC = "SELECT i.id, min(s.unit_price), name, brand, img, s.size, i.description FROM item i, item_img img, item_size s, review r where i.id = img.id and i.id = s.id and i.id = r.ItID and i.type like ? and s.unit_price BETWEEN ? AND ? AND i.name LIKE ? AND i.brand LIKE ? GROUP BY i.id ORDER BY avg(r.stars) DESC;";
	
	/** Constant for get item size list for shop page */
	public static final String QUERY_ID_GET_ITEM_SIZE_LIST_FOR_SHOP = "select size from item_size where Id = ? order by unit_price;";
	
	/** Constant for get main categories for shop page */
	public static final String QUERY_ID_GET_BRAND_LIST_FOR_SHOP = "SELECT brand FROM item WHERE type LIKE ?;";
	
	/** Constant for get average item rating */
	public static final String QUERY_ID_GET_ITEM_AVERAGE_RATING = "select avg(stars) from review where itID = ?;";
	
	/** Constant for get rating count for an item */
	public static final String QUERY_ID_GET_ITEM_RATING_COUNT = "select count(reviewID) from review where ItID = ?;";
	
	/** Constant for get details for rating percentage for an item */
	public static final String QUERY_ID_GET_DETAILS_FOR_ITEM_RATING_PERCENTAGE = "select stars from review where ItID = ?;";
	
	/** Constant for get all ratings for an item */
	public static final String QUERY_ID_GET_ALL_RATINGS_FOR_AN_ITEM = "SELECT reviewID, email, description, stars, date_format(date, '%d %M %Y') as 'date' FROM review where ItID = ?;";
	
	/** Constant for get rating images for an item */
	public static final String QUERY_ID_GET_RATING_IMAGES_FOR_AN_ITEM = "SELECT img FROM review_img where reviewID = ?;";
	
	/** Constant for select question ids */
	public static final String QUERY_ID_SELECT_QUESTION_IDS = "SELECT qID FROM question;";
	
	/** Constant for create a question */
	public static final String QUERY_ID_CREATE_QUESTION = "INSERT INTO question(qID, question, qDate, itID, cusEmail) VALUES(?, ?, NOW(), ?, ?);";
	
	/** Constant for answer a question */
	public static final String QUERY_ID_ANSWER_QUESTION = "UPDATE question SET answer = ?, aDate = NOW(), adEmail = ? WHERE qID = ?;";

	/** Constant for get all questions and answers by itemID */
	public static final String QUERY_ID_GET_QST_AND_ANS_BY_ITEMID = "SELECT qID, question, answer, date_format(qDate, '%M %d, %Y AT %h:%i%p') AS 'qDate', date_format(aDate, '%M %d, %Y AT %h:%i%p'), itID, cusEmail, adEmail FROM question WHERE itID = ? ORDER BY qDate DESC;";
	
	/** Constant for get new questions */
	public static final String QUERY_ID_GET_NEW_QUESTIONS = "SELECT qID, question, date_format(qDate, '%M %d, %Y AT %h:%i%p') AS 'qDate', itID, cusEmail FROM question WHERE answer IS NULL AND aDate IS NULL AND adEmail IS NULL ORDER BY qDate DESC;";
	
	/** Constant for get answered questions */
	public static final String QUERY_ID_GET_ANSWERED_QUESTIONS = "SELECT qID, question, answer, date_format(qDate, '%M %d, %Y AT %h:%i%p') AS 'qDate', date_format(aDate, '%M %d, %Y AT %h:%i%p') AS 'aDate', itID, cusEmail FROM question WHERE answer IS NOT NULL AND aDate IS NOT NULL AND adEmail IS NOT NULL ORDER BY aDate DESC;";
	
	/** Constant for get answered questions */
	public static final String QUERY_ID_EDIT_ANSWERED_QUESTIONS = "UPDATE question SET answer = ?, aDate = NOW() WHERE qID = ?;";
	
	/** Constant for delete a question */
	public static final String QUERY_ID_DELETE_QUESTION = "DELETE FROM question WHERE qID = ?;";
	
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
