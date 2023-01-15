package model;


public class Item{

	private String itemID;
	private String p_name;
	private int quantity;
	private double price;
	private String des;
	private String mf;
	private String exp;
	private String Warrant;

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
