package model;

public class Return {
	
	private int oID;
	private String name;
	private String reason;
	private String comment;
	private double amount;
	private String email;
	
	public Return(int oID, String name, String reason, String comment, double amount, String email) {
		super();
		this.oID = oID;
		this.name = name;
		this.reason = reason;
		this.comment = comment;
		this.amount = amount;
		this.email = email;
	}

	public int getoID() {
		return oID;
	}

	public void setoID(int oID) {
		this.oID = oID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	

}
