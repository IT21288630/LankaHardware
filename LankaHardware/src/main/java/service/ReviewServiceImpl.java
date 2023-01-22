package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Customer;
import model.Review;
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
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return avgRating;
	}

	@Override
	public int getItemRatingCount(String itemID) {
		// TODO Auto-generated method stub
		int count = 0;

		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ITEM_RATING_COUNT);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();
			rs.next();

			count = rs.getInt(CommonConstants.COLUMN_INDEX_ONE);

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

		return count;
	}

	@Override
	public double[][] calculateItemRatingPercentage(String itemID) {
		// TODO Auto-generated method stub

		double[][] ratingPercentageList = new double[5][2];
		ArrayList<Double> percentages = new ArrayList<>();
		ArrayList<Double> starNumbers = new ArrayList<>();
		int oneStar = 0, twoStar = 0, threeStar = 0, fourStar = 0, fiveStar = 0, itemRatingCount;
		double percentage;
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_DETAILS_FOR_ITEM_RATING_PERCENTAGE);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();

			while (rs.next()) {
				int star = rs.getInt(CommonConstants.COLUMN_INDEX_ONE);

				if (star == 1) {
					oneStar++;
				} else if (star == 2) {
					twoStar++;
				} else if (star == 3) {
					threeStar++;
				} else if (star == 4) {
					fourStar++;
				} else if (star == 5) {
					fiveStar++;
				}
			}

			itemRatingCount = getItemRatingCount(itemID);

			percentage = (oneStar / (double) itemRatingCount) * 100;
			percentages.add(percentage);

			percentage = (twoStar / (double) itemRatingCount) * 100;
			percentages.add(percentage);

			percentage = (threeStar / (double) itemRatingCount) * 100;
			percentages.add(percentage);

			percentage = (fourStar / (double) itemRatingCount) * 100;
			percentages.add(percentage);

			percentage = (fiveStar / (double) itemRatingCount) * 100;
			percentages.add(percentage);

			starNumbers.add((double) oneStar);
			starNumbers.add((double) twoStar);
			starNumbers.add((double) threeStar);
			starNumbers.add((double) fourStar);
			starNumbers.add((double) fiveStar);

			for (int i = 0; i < ratingPercentageList.length; i++) {
				ratingPercentageList[i][0] = percentages.get(i);
				ratingPercentageList[i][1] = starNumbers.get(i);
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

		return ratingPercentageList;
	}

	@Override
	public ArrayList<Review> getItemRatings(String itemID) {
		// TODO Auto-generated method stub

		ArrayList<Review> reviews = new ArrayList<>();
		con = DBConnectionUtil.getDBConnection();

		try {
			pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_ALL_RATINGS_FOR_AN_ITEM);
			pst.setString(CommonConstants.COLUMN_INDEX_ONE, itemID);
			rs = pst.executeQuery();

			while (rs.next()) {
				Review review = new Review();
				Customer customer = new Customer();

				review.setReviewID(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				customer.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				review.setCustomer(customer);
				review.setReviewDescription(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				review.setStars(rs.getInt(CommonConstants.COLUMN_INDEX_FOUR));
				review.setReviewDate(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));

				reviews.add(review);
			}

			for (Review review : reviews) {
				ArrayList<String> reviewImages = new ArrayList<>();
				
				pst = con.prepareStatement(CommonConstants.QUERY_ID_GET_RATING_IMAGES_FOR_AN_ITEM);
				pst.setString(CommonConstants.COLUMN_INDEX_ONE, review.getReviewID());
				rs = pst.executeQuery();

				while (rs.next()) {
					reviewImages.add(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				}

				review.setReviewImages(reviewImages);
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

		return reviews;
	}

	public static void main(String[] args) {
		IReviewService iReviewService = new ReviewServiceImpl();
		ArrayList<Review> reviews = iReviewService.getItemRatings("i500");

		for (Review review : reviews) {
			System.out.println(review.getReviewID());
			
			ArrayList<String> arrayList = review.getReviewImages();
			
			for (String string : arrayList) {
				System.out.println(string);
			}
		}
	}
}
