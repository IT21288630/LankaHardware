package service;

import java.util.ArrayList;
import java.util.logging.Logger;

import model.Review;

public interface IReviewService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IReviewService.class.getName());

	/**
	 * get average rating for an item
	 * 
	 *  @param itemID
	 */
	public double getAverageRating(String itemID);
	
	/**
	 * get rating count for an item
	 * 
	 *  @param itemID
	 */
	public int getItemRatingCount(String itemID);
	
	/**
	 * calculate rating percentage for an item
	 * 
	 *  @param itemID
	 */
	public double[][] calculateItemRatingPercentage(String itemID);
	
	/**
	 * get all ratings for an item
	 * 
	 *  @param itemID
	 */
	public ArrayList<Review> getItemRatings(String itemID);
}
