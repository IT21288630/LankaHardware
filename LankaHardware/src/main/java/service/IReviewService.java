package service;

import java.util.logging.Logger;

public interface IReviewService {
	/** Initialize logger */
	public static final Logger log = Logger.getLogger(IReviewService.class.getName());

	/**
	 * get average rating for an item
	 * 
	 *  @param itemID
	 */
	public double getAverageRating(String itemID);
}
