package model;

import java.util.ArrayList;

public class Shop {

	private ArrayList<String> mainCategories;
	private ArrayList<String> subCategories;
	private ArrayList<Item> items;
	private double lowestPrice;
	private double highestPrice;

	public ArrayList<String> getMainCategories() {
		return mainCategories;
	}

	public void setMainCategories(ArrayList<String> mainCategories) {
		this.mainCategories = mainCategories;
	}

	public ArrayList<String> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(ArrayList<String> subCategories) {
		this.subCategories = subCategories;
	}

	public ArrayList<Item> getItems() {
		return items;
	}

	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}

	public double getLowestPrice() {
		return lowestPrice;
	}

	public void setLowestPrice(double lowestPrice) {
		this.lowestPrice = lowestPrice;
	}

	public double getHighestPrice() {
		return highestPrice;
	}

	public void setHighestPrice(double highestPrice) {
		this.highestPrice = highestPrice;
	}

}
