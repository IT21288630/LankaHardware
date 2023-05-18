package model;

import java.util.ArrayList;

public abstract class User {

	private String email;
	private String password;
	private String name;
	private String phone;
	private String address;
	private String ProfilePic;
	private ArrayList<String> profile;
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getProfilePic() {
		return ProfilePic;
	}

	public void setProfilePic(String profilePic) {
		this.ProfilePic = profilePic;
	}

	public ArrayList<String> getProfile() {
		return profile;
	}

	public void setProfile(ArrayList<String> profile) {
		this.profile = profile;
	}
}
