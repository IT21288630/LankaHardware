package service;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Return;

public class ReturnServiceImpl {
	
	private String jdbcURL = "jdbc:mysql://localhost:3306/lankahardware?useSSL=false";
	private String jdbcUsername = "root";
	private String jdbcPassword = "leomord123";

	private static final String INSERT_RETURN_SQL = "INSERT INTO return" + "  (oID, name, reason, comment, amount, email) VALUES "
			+ " (?, ?, ?, ?, ?, ?);";

	private static final String SELECT_RETURN_BY_ID = "select oID, name, reason, comment, amount, email from return where oID =?";
	private static final String SELECT_ALL_RETURN = "select * from return_refund";
	
	public ReturnServiceImpl() {
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

	public void insertReturn(Return ret) throws SQLException {
		System.out.println(INSERT_RETURN_SQL);
		// try-with-resource statement will auto close the connection.
		try (Connection connection = getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(INSERT_RETURN_SQL)) {
			preparedStatement.setInt(1, ret.getoID());
			preparedStatement.setString(2, ret.getName());
			preparedStatement.setString(3, ret.getReason());
			preparedStatement.setString(4, ret.getComment());
			preparedStatement.setDouble(5, ret.getAmount());
			preparedStatement.setString(6, ret.getEmail());
			System.out.println(preparedStatement);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			printSQLException(e);
		}
	}
	
	
	public Return selectReturn(int oID) {
		Return ret = null;
		// Step 1: Establishing a Connection
		try (Connection connection = getConnection();
				// Step 2:Create a statement using connection object
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_RETURN_BY_ID);) {
			preparedStatement.setInt(1, oID);
			System.out.println(preparedStatement);
			// Step 3: Execute the query or update query
			ResultSet rs = preparedStatement.executeQuery();

			// Step 4: Process the ResultSet object.
			while (rs.next()) {
				String name = rs.getString("name");
				String reason = rs.getString("reason");
				String comment = rs.getString("comment");
				double amount = rs.getDouble("amount");
				String email = rs.getString("email");
				ret = new Return(oID, name, reason, comment, amount, email);
			}
		} catch (SQLException e) {
			printSQLException(e);
		}
		return ret;
	}

	public  List<Return> selectAllReturn() {

		// using try-with-resources to avoid closing resources (boiler plate code)
		List<Return> rets = new ArrayList<>();
		// Step 1: Establishing a Connection
		try (Connection connection = getConnection();

				// Step 2:Create a statement using connection object
			PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_RETURN);) {
			System.out.println(preparedStatement);
			// Step 3: Execute the query or update query
			ResultSet rs = preparedStatement.executeQuery();

			// Step 4: Process the ResultSet object.
			while (rs.next()) {
				int oID = rs.getInt("oID");
				String name = rs.getString("name");
				String reason = rs.getString("reason");
				String comment = rs.getString("comment");
				double amount = rs.getDouble("amount");
				String email = rs.getString("email");
				rets.add(new Return(oID, name, reason, comment, amount, email));
			}
		} catch (SQLException e) {
			printSQLException(e);
		}
		return rets;
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
