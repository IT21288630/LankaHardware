package model;

import java.util.ArrayList;

public class Orderreal {
	
	private String oID;
	private String name;
	private ArrayList<Item> items;
	private String date_time;
	private String phone;
	private String address;
	private String total;
	private String email;
	private String status;
	private String p_method;
	
	
	public String getP_method() {
		return p_method;
	}
	public void setP_method(String p_method) {
		this.p_method = p_method;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getoID() {
		return oID;
	}
	public void setoID(String oID) {
		this.oID = oID;
	}
	public ArrayList<Item> getItems() {
		return items;
	}
	public void setItems(ArrayList<Item> items) {
		this.items = items;
	}
	public String getDate_time() {
		return date_time;
	}
	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
