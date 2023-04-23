package service;
import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import model.Payment;

public class PaymentService {
	
	public int registerPayment(Payment payment) throws ClassNotFoundException {
        String INSERT_PAYMENT_SQL = "INSERT INTO payment_detail" +
            "  (pid, card_no, ccv, exp_date, name, type, order ) VALUES " +
            " (?, ?, ?, ?, ?, ?, ?);";

        int result = 0;

        Class.forName("com.mysql.jdbc.Driver");

        try (Connection connection = DriverManager
            .getConnection("jdbc:mysql://localhost:3306/lankahardware?useSSL=false", "root", "leomord123");

            // Step 2:Create a statement using connection object
            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_PAYMENT_SQL)) {
            preparedStatement.setString(1, payment.getPid());
			preparedStatement.setString(2, payment.getCard_no());
			preparedStatement.setString(3, payment.getCcv());
			preparedStatement.setString(4, payment.getExp_date());
			preparedStatement.setString(5, payment.getName());
			preparedStatement.setString(6, payment.getType());
			preparedStatement.setInt(7, payment.getOrder().getOrderID());

            System.out.println(preparedStatement);
            // Step 3: Execute the query or update query
            result = preparedStatement.executeUpdate();

        } catch (SQLException e) {
            // process sql exception
            printSQLException(e);
        }
        return result;
    }

    private void printSQLException(SQLException ex) {
        for (Throwable e: ex) {
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
