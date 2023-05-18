package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import service.CustomerServiceImpl;
import service.ICustomerService;


/**
 * Servlet implementation class SendCustomeremail
 */
@WebServlet("/SendCustomeremail")
public class SendCustomeremail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendCustomeremail() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
doGet(request, response);
		


        HttpSession session = request.getSession();
        
		String email = request.getParameter("email");
		ICustomerService icustomerService = new CustomerServiceImpl();
		Random rand = new Random();
		int otp = rand.nextInt((9999 - 100) + 1) + 10;
		
	    session.setAttribute("otp",otp);
	    session.setAttribute("otpEmail",email);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(icustomerService.SendCustomeremail(email, otp));
		
		
		out.print(resp);
	}
		
	}


