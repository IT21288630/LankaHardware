package model;

public class Item {

	private String itemID;
	private String name;
	private int quantity;
	private double price;
	private String description;
	private String mfDate;
	private String expDate;
	private String Warranty;

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
}
