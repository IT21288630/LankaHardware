package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import util.CommonConstants;
import util.DBConnectionUtil;

public class ReviewServiceImpl implements IReviewService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(ReviewServiceImpl.class.getName());

	@Override
	public double getAverageRating(String itemID) {
		// TODO Auto-generated method stub
		
		double avgRating = 0;
		con = DBConnectionUtil.getDBConnection();
		
		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEM_AVERAGE_RATING);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();
			rs.next();
			
			avgRating = rs.getDouble(CommonConstants.COLUMN_INDEX_ONE);
			
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

		return avgRating;
	}

	public static void main(String[] args) {
		IReviewService iReviewService = new ReviewServiceImpl();
		System.out.println(iReviewService.getAverageRating("i500"));
	}
}
