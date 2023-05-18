package model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;

public class Shop {

	private HashSet<String> mainCategories;
	private Map<String, HashSet<String>> subCategories;
	private ArrayList<Item> items;
	private HashSet<String> brandList;
	private double lowestPrice;
	private double highestPrice;

	public HashSet<String> getMainCategories() {
		return mainCategories;
	}

	public void setMainCategories(HashSet<String> mainCategories) {
		this.mainCategories = mainCategories;
	}

	public Map<String, HashSet<String>> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(Map<String, HashSet<String>> subCategories) {
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

	public HashSet<String> getBrandList() {
		return brandList;
	}

	public void setBrandList(HashSet<String> brandList) {
		this.brandList = brandList;
	}

}
