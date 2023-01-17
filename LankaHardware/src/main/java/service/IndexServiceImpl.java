package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Index;
import model.Item;
import util.CommonConstants;
import util.DBConnectionUtil;

public class IndexServiceImpl implements IIndexService {

	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IndexServiceImpl.class.getName());

	@Override
	public ArrayList<Item> getNewArrivals() {
		// TODO Auto-generated method stub

		con = DBConnectionUtil.getDBConnection();
		
		ArrayList<Item> items = new ArrayList<>();
		Index index = new Index();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_GET_NEW_ARRIVALS);
			
			while (rs.next()) {
				Item item = new Item();
				
				item.setItemID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				
				
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

		index.setItems(items);
		
		return index.getItems();
	}

}
