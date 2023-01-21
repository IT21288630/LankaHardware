package model;

public class Review {

	private String reviewID;
	private String reviewDescription;
	private String reviewDate;
	private int stars;

	public String getReviewID() {
		return reviewID;
	}

	public void setReviewID(String reviewID) {
		this.reviewID = reviewID;
	}

	public String getReviewDescription() {
		return reviewDescription;
	}

	public void setReviewDescription(String reviewDescription) {
		this.reviewDescription = reviewDescription;
	}

	public String getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(String reviewDate) {
		this.reviewDate = reviewDate;
	}

	public int getStars() {
		return stars;
	}

	public void setStars(int stars) {
		this.stars = stars;
	}

}
