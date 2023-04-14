package service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.Part;

import org.apache.commons.io.FileUtils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.gson.JsonElement;

import model.Item;
import util.CommonConstants;
import util.CommonUtil;
import util.DBConnectionIsuru;

public class IStockServiceImpl implements IStockService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;



	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IStockServiceImpl.class.getName());

	@Override
	public ArrayList<Item> getAllStockItems() {
		// TODO Auto-generated method stub

		ArrayList<Item> items = new ArrayList<>();
		con = DBConnectionIsuru.getConnection();
		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_Stock);

			while (rs.next()) {
				Item item = new Item();
				
				 item.setItemID(rs.getString(1));
				 item.setName(rs.getString(2));
				 item.setType(rs.getString(3));
				 item.setBrand(rs.getString(4));
				 item.setPrice(rs.getDouble(5));
				 item.setQuantity(rs.getInt(6));
				 item.setDescription(rs.getString(7));
				 item.setMfDate(rs.getString(8));
				 item.setExpDate(rs.getString(9));
				 item.setWarrentyType(rs.getString(10));
				 item.setWarrentyNumber(rs.getInt(11));
				 item.setWarrantyPeriod(rs.getString(12));


				items.add(item);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return items;
	}

	@Override
	public String addStockItems(Item  item, Collection<Part> parts) {
		// TODO Auto-generated method stub

		String status = "There was something wrong";
		ArrayList<String> imagePathArrayList = new ArrayList<String>();
		ArrayList<String> stockIds = new ArrayList<String>();

		Map<String, String> config = new HashMap<String, String>();
		config.put("cloud_name", "dqgiitni2");
		config.put("api_key", "987952682616387");
		config.put("api_secret", "0Zw3qi4VX6XjfMh9LYSDYVdyOns");
		Cloudinary cloudinary = new Cloudinary(config);

		for (Part part : parts) {
			if (part.getSubmittedFileName() != null) {

				try {
					InputStream is = part.getInputStream();

					File tempFile = File.createTempFile("javaMyfile", ".xls");
					FileUtils.copyToFile(is, tempFile);

					System.out.println(tempFile.getName());
					System.out.println(tempFile.exists());

					// Upload to cloudinary
					try {
						Map<String, String> map = cloudinary.uploader().upload(tempFile, ObjectUtils.asMap());
						imagePathArrayList.add(map.get("url"));
					} catch (IOException exception) {
						System.out.println(exception.getMessage());
					}

					System.out.println("deleting " + tempFile.getAbsolutePath() + " " + tempFile.delete());
					System.out.println(tempFile.exists());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		try {
			st = con.createStatement();
			rs= st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_Stock_IDS);
			
			while (rs.next()) {
				stockIds.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
			}
			
			item.setItemID(CommonUtil.generateIDs(stockIds, "stock"));
			
			pst = con.prepareStatement(CommonConstants.QUERY_ID_ADD_TO_stock);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, item.getItemID());
			pst.setString(CommonConstants.COLUMN_INDEX_TWO, item.getName());
			pst.setString(CommonConstants.COLUMN_INDEX_THREE, item.getType());
			pst.setString(CommonConstants.COLUMN_INDEX_FOUR, item.getBrand());
			pst.setDouble(CommonConstants.COLUMN_INDEX_FIVE, item.getPrice());
			pst.setInt(CommonConstants.COLUMN_INDEX_SIX, item.getQuantity());
			pst.setString(CommonConstants.COLUMN_INDEX_SEVEN, item.getDescription());
			pst.setString(CommonConstants.COLUMN_INDEX_EIGHT, item.getMfDate());
			pst.setString(CommonConstants.COLUMN_INDEX_NINE, item.getExpDate());
			pst.setString(CommonConstants.COLUMN_INDEX_TEN, item.getWarrentyType());
			pst.setInt(CommonConstants.COLUMN_INDEX_ELEVEN, item.getWarrentyNumber());
			pst.setString(CommonConstants.COLUMN_INDEX_TWELVE, item.getWarrantyPeriod());
	
			
			
			
			/*for (String string : imagePathArrayList) {
				pst.setString(CommonConstants.COLUMN_INDEX_ELEVEN, string);
			}
*/
			pst.executeUpdate();

			status = "Stock Item Added";

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
	public String removeStockItems(String stockId) {
		// TODO Auto-generated method stub
		
		Item item = new Item();
		item.setItemID(stockId);
		
		con = DBConnectionIsuru.getConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_CLEAR_StockItem);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, item.getItemID());

			pst.executeUpdate();
			
			System.out.println("done");

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

		return "Stock Item removed";
	}

	
	@Override
	public String updateStockItems(String id, String name, String cat, String Brand, double U_price, int quantity, String Des, String mf,String exp,String WarrantyType, int warrentyNum, String warPeriod) {
		// TODO Auto-generated method stub

		String status = "There was a problem";
		
		con = DBConnectionIsuru.getConnection();

		try {
			if(!id.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_NAME);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, name);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			if(!cat.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_CAT);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, cat);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			if(!Brand.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_BRAND);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, Brand);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			String price = Double.toString(U_price);
			
			if(!price.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_PRICE);
				pst.setDouble(CommonConstants.COLUMN_INDEX_ONE, U_price);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			if(quantity > 0) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_QUANTITY);
				pst.setInt(CommonConstants.COLUMN_INDEX_ONE, quantity);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
		
			if(!Des.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_DESCRIPTION);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, Des);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
		
			if(!mf.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_MF);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, mf);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			if(!exp.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_EXP);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, exp);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			if(!WarrantyType.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_WARTYPE);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, WarrantyType);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			if(warrentyNum != 0) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_WARNUM);
				pst.setInt(CommonConstants.COLUMN_INDEX_ONE, warrentyNum);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
			if(!warPeriod.equals("null")) {
				pst = con.prepareStatement(CommonConstants.QUERY_ID_UPDATE_ITEM_WARPERIOD);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, warPeriod);
				pst.setString(CommonConstants.COLUMN_INDEX_TWO, id);
				pst.executeUpdate();
			}
			
	

			status = "Stock Item Updated";

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

	


}

	
