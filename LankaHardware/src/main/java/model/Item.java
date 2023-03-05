package model;

import java.util.ArrayList;
import java.util.LinkedHashMap;

public class Item {

	private String itemID;
	private String name;
	private String brand;
	private int quantity;
	private double price;
	private String description;
	private String mfDate;
	private String expDate;
	private String Warranty;
	private String size;
	private String mainImg;
	private double avgRating;
	private int ratingCount;
	private double[][] ratingPercentageList;
	private LinkedHashMap<String, Double> sizesAndPrizes;
	private LinkedHashMap<String, Boolean> isInWishlist;
	private String type;
	private String subType;
	private ArrayList<String> allImages;

	public ArrayList<String> getAllImages() {
		return allImages;
	}

	public void setAllImages(ArrayList<String> allImages) {
		this.allImages = allImages;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSubType() {
		return subType;
	}

	public void setSubType(String subType) {
		this.subType = subType;
	}

	public int getRatingCount() {
		return ratingCount;
	}

	public void setRatingCount(int ratingCount) {
		this.ratingCount = ratingCount;
	}

	public String getMainImg() {
		return mainImg;
	}

	public void setMainImg(String mainImg) {
		this.mainImg = mainImg;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMfDate() {
		return mfDate;
	}

	public void setMfDate(String mfDate) {
		this.mfDate = mfDate;
	}

	public String getExpDate() {
		return expDate;
	}

	public void setExpDate(String expDate) {
		this.expDate = expDate;
	}

	public String getWarranty() {
		return Warranty;
	}

	public void setWarranty(String warranty) {
		Warranty = warranty;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getItemID() {
		return itemID;
	}

	public void setItemID(String itemID) {
		this.itemID = itemID;
	}

	public double getAvgRating() {
		return avgRating;
	}

	public void setAvgRating(double avgRating) {
		this.avgRating = avgRating;
	}

	public double[][] getRatingPercentageList() {
		return ratingPercentageList;
	}

	public void setRatingPercentageList(double[][] ratingPercentageList) {
		this.ratingPercentageList = ratingPercentageList;
	}

	public LinkedHashMap<String, Double> getSizesAndPrizes() {
		return sizesAndPrizes;
	}

	public void setSizesAndPrizes(LinkedHashMap<String, Double> sizesAndPrizes) {
		this.sizesAndPrizes = sizesAndPrizes;
	}

	public LinkedHashMap<String, Boolean> getIsInWishlist() {
		return isInWishlist;
	}

	public void setIsInWishlist(LinkedHashMap<String, Boolean> isInWishlist) {
		this.isInWishlist = isInWishlist;
	}

}
