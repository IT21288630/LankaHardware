package service;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Order;

public class ManagerServiveImpl {

	private String jdbcURL = "jdbc:mysql://localhost:3306/lankahardware?useSSL=false";
	private String jdbcUsername = "root";
	private String jdbcPassword = "leomord123";

	private static final String INSERT_USERS_SQL = "INSERT INTO order_item" + "  (orderID, itemID, pname, oDate, dDate, sPrice, tPrice, email, orderstatus) VALUES "
			+ " (?, ?, ?, ?, ?, ?, ?, ?, ?);";

	private static final String SELECT_USER_BY_ID = "select orderID, itemID, pname, oDate, dDate, sPrice, tPrice, email, orderstatus from order_item where orderID =?";
	private static final String SELECT_ALL_USERS = "select * from order_item";
	private static final String DELETE_USERS_SQL = "delete from order_item where orderID = ?;";
	private static final String UPDATE_USERS_SQL = "update order_item set itemID = ?, pname = ?, oDate =?, dDate =?, sPrice = ?, tPrice = ?, email = ?, orderstatus = ? where orderID = ?;";

	public ManagerServiveImpl() {
	}

	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return connection;
	}

	public void insertUser(Order user) throws SQLException {
		System.out.println(INSERT_USERS_SQL);
		// try-with-resource statement will auto close the connection.
		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USERS_SQL)) {
			preparedStatement.setInt(1, user.getOrderID());
			preparedStatement.setString(2, user.getItemID());
			preparedStatement.setString(3, user.getPname());
			preparedStatement.setString(4, user.getoDate());
			preparedStatement.setString(5, user.getdDate());
			preparedStatement.setDouble(6, user.getsPrice());
			preparedStatement.setDouble(7, user.gettPrice());
			preparedStatement.setString(8, user.getEmail());
			preparedStatement.setString(9, user.getOrderstatus());
			System.out.println(preparedStatement);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			printSQLException(e);
		}
	}
	
	
	public Order selectUser(int orderID) {
		Order user = null;
		// Step 1: Establishing a Connection
		try (Connection connection = getConnection();
				// Step 2:Create a statement using connection object
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USER_BY_ID);) {
			preparedStatement.setInt(1, orderID);
			System.out.println(preparedStatement);
			// Step 3: Execute the query or update query
			ResultSet rs = preparedStatement.executeQuery();

			// Step 4: Process the ResultSet object.
			while (rs.next()) {
				String itemID = rs.getString("itemID");
				String pname = rs.getString("pname");
				String oDate = rs.getString("oDate");
				String dDate = rs.getString("dDate");
				double sPrice = rs.getDouble("sPrice");
				double tPrice = rs.getDouble("tPrice");
				String email = rs.getString("email");
				String orderstatus = rs.getString("orderstatus");
				user = new Order(orderID, itemID, pname, oDate, dDate, sPrice, tPrice, email, orderstatus);
			}
		} catch (SQLException e) {
			printSQLException(e);
		}
		return user;
	}

	public  List<Order> selectAllUsers() {

		// using try-with-resources to avoid closing resources (boiler plate code)
		List<Order> users = new ArrayList<>();
		// Step 1: Establishing a Connection
		try (Connection connection = getConnection();

				// Step 2:Create a statement using connection object
			PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_USERS);) {
			System.out.println(preparedStatement);
			// Step 3: Execute the query or update query
			ResultSet rs = preparedStatement.executeQuery();

			// Step 4: Process the ResultSet object.
			while (rs.next()) {
				int orderID = rs.getInt("orderID");
				String itemID = rs.getString("itemID");
				String pname = rs.getString("pname");
				String oDate = rs.getString("oDate");
				String dDate = rs.getString("dDate");
				double sPrice = rs.getDouble("sPrice");
				double tPrice = rs.getDouble("tPrice");
				String email = rs.getString("email");
				String orderstatus = rs.getString("orderstatus");
				users.add(new Order(orderID, itemID, pname, oDate, dDate, sPrice, tPrice, email, orderstatus));
			}
		} catch (SQLException e) {
			printSQLException(e);
		}
		return users;
	}

	public boolean deleteUser(int orderID) throws SQLException {
		boolean rowDeleted;
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(DELETE_USERS_SQL);) {
			statement.setInt(1, orderID);
			rowDeleted = statement.executeUpdate() > 0;
		}
		return rowDeleted;
	}

	public boolean updateUser(Order user) throws SQLException {
		boolean rowUpdated;
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(UPDATE_USERS_SQL);) {
			System.out.println("updated USer:"+statement);
			statement.setString(1, user.getItemID());
			statement.setString(2, user.getPname());
			statement.setString(3, user.getoDate());
			statement.setString(4, user.getdDate());
			statement.setDouble(5, user.getsPrice());
			statement.setDouble(6, user.gettPrice());
			statement.setString(7, user.getEmail());
			statement.setString(8, user.getOrderstatus());

			rowUpdated = statement.executeUpdate() > 0;
		}
		return rowUpdated;
	}
	

	private void printSQLException(SQLException ex) {
		for (Throwable e : ex) {
			if (e instanceof SQLException) {
				e.printStackTrace(System.err);
				System.err.println("SQLState: " + ((SQLException) e).getSQLState());
				System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
				System.err.println("Message: " + e.getMessage());
				Throwable t = ex.getCause();
				while (t != null) {
					System.out.println("Cause: " + t);
					t = t.getCause();
				}
			}
		}
	}
}
