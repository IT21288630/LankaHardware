package model;

public class Order {
	
	private int orderID;
	private String itemID;
	private String pname;
	private String oDate;
	private String dDate;
	private double sPrice;
	private double tPrice;
	private String email;
	private String orderstatus;


	public Order(String itemID, String pname, String oDate, String dDate, double sPrice, double tPrice, String email,
			String orderstatus) {
		super();
		this.itemID = itemID;
		this.pname = pname;
		this.oDate = oDate;
		this.dDate = dDate;
		this.sPrice = sPrice;
		this.tPrice = tPrice;
		this.email = email;
		this.orderstatus = orderstatus;
	}

	public Order(int orderID, String itemID, String pname, String oDate, String dDate, double sPrice, double tPrice,
			String email, String orderstatus) {
		super();
		this.orderID = orderID;
		this.itemID = itemID;
		this.pname = pname;
		this.oDate = oDate;
		this.dDate = dDate;
		this.sPrice = sPrice;
		this.tPrice = tPrice;
		this.email = email;
		this.orderstatus = orderstatus;
	}

	public String getOrderstatus() {
		return orderstatus;
	}

	public void setOrderstatus(String orderstatus) {
		this.orderstatus = orderstatus;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getoDate() {
		return oDate;
	}

	public void setoDate(String oDate) {
		this.oDate = oDate;
	}

	public String getdDate() {
		return dDate;
	}

	public void setdDate(String dDate) {
		this.dDate = dDate;
	}


	public double getsPrice() {
		return sPrice;
	}

	public void setsPrice(double sPrice) {
		this.sPrice = sPrice;
	}

	public String getItemID() {
		return itemID;
	}

	public void setItemID(String itemID) {
		this.itemID = itemID;
	}

	public double gettPrice() {
		return tPrice;
	}

	public void settPrice(double tPrice) {
		this.tPrice = tPrice;
	}

	public int getOrderID() {
		return orderID;
	}
	
	public void setOrderID(int orderID) {
		this.orderID = orderID;
	}
	
	
	
	

}
