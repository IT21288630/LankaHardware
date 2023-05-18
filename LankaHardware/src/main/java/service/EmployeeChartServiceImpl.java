package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import model.Employee;
import model.Item;
import util.CommonConstants;
import util.DBConnectionUtil;

public class EmployeeChartServiceImpl implements IEmployeeChartService {
	private static Connection con;

	private static Statement st;

	private static PreparedStatement pst;

	private static ResultSet rs;

	/** Initialize logger */
	public static final Logger log = Logger.getLogger(EmployeeChartServiceImpl.class.getName());

	@Override
	public ArrayList<Employee> getAllEmployees() {
		// TODO Auto-generated method stub
		ArrayList<Employee> employees = new ArrayList<>();

		con = DBConnectionUtil.getDBConnection();

		try {
			st = con.createStatement();
			rs = st.executeQuery(CommonConstants.QUERY_ID_SELECT_ALL_EMPLOYEES );

			while (rs.next()) {
				Employee employee = new Employee();

				employee.setEmpNo(rs.getString(CommonConstants.COLUMN_INDEX_ONE));
				employee.setName(rs.getString(CommonConstants.COLUMN_INDEX_TWO));
				employee.setEmail(rs.getString(CommonConstants.COLUMN_INDEX_THREE));
				employee.setDesignation(rs.getString(CommonConstants.COLUMN_INDEX_FOUR));
				employee.setPhoneNum(rs.getString(CommonConstants.COLUMN_INDEX_FIVE));
				employee.setAddress(rs.getString(CommonConstants.COLUMN_INDEX_SIX));
				employee.setGender(rs.getString(CommonConstants.COLUMN_INDEX_SEVEN));
				employee.setDate(rs.getString(CommonConstants.COLUMN_INDEX_EIGHT));
				employee.setWage(rs.getString(CommonConstants.COLUMN_INDEX_NINE));
				employee.setSalary(rs.getDouble(CommonConstants.COLUMN_INDEX_TEN));

				employees.add(employee);
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			/*
			 * Close prepared statement and database connectivity at the end of transaction
			 */

			try {
				if (st != null) {
					st.close();
				}
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				log.log(Level.SEVERE, e.getMessage());
			}
		}

		return employees;
	}
}
