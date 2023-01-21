package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Index;
import model.Item;
import util.CommonConstants;
import util.DBConnectionUtil;

public class IndexServiceImpl implements IIndexService {

	private static Connection con;

	private static Statement st, st2;

	private static PreparedStatement pst;

	private static ResultSet rs, rs2;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IndexServiceImpl.class.getName());

	@Override
	public ArrayList<Item> getNewArrivals() {
		// TODO Auto-generated method stub

		IReviewService iReviewService = new ReviewServiceImpl();
		ArrayList<Item> items = new ArrayList<>();
		Index index = new Index();
		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_MINIMUM_PRICE);
			st2 = con.createStatement();
			rs2 = st2.executeQuery(CommonConstants.QUERY_ID_GET_NEW_ARRIVALS);
			
			while (rs.next() && rs2.next()) {
				Item item = new Item();

				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setPrice(rs.getDouble(CommonConstants.COLUMN_INDEX_TWO));
				item.setName(rs2.getString(CommonConstants.COLUMN_INDEX_ONE));
				item.setBrand(rs2.getString(CommonConstants.COLUMN_INDEX_TWO));
				item.setMainImg(rs2.getString(CommonConstants.COLUMN_INDEX_THREE));
				
				items.add(item);
			}
			
			for (Item item : items) {
				item.setAvgRating(iReviewService.getAverageRating(item.getItemID()));
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
				if (rs2 != null) {
					rs2.close();
				}
				if (st2 != null) {
					st2.close();
				}
				if (con != null) {
					con.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		index.setItems(items);

		return index.getItems();
	}

	public static void main(String[] args) {
		IIndexService iIndexService = new IndexServiceImpl();
		ArrayList<Item> items = iIndexService.getNewArrivals();
		
		for (Item item : items) {
			System.out.println(item.getItemID());
			System.out.println(item.getAvgRating());
			System.out.println();
		}
	}
}
