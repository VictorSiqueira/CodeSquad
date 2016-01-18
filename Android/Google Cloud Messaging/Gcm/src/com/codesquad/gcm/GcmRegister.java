package com.codesquad.gcm;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Componente criado para ser acessado pelo aplicativo Android,
 * com objetivo de armazenar o gcm ID de cada device
 *
 */
@WebServlet("/register")
public class GcmRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	doPost(request, response);
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    @SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	String gcmId = request.getParameter("deviceGcmId");
    	if (gcmId==null) {
    		return;
    	}
		List<String> devices = (List<String>)request.getServletContext().getAttribute(Constants.GCM_IDS);
		if (devices==null) {
			devices = new LinkedList<String>();
			request.getServletContext().setAttribute(Constants.GCM_IDS, devices);
		}
		//
		if (gcmId!=null && !devices.contains(gcmId)) {
			devices.add(gcmId);
		}
	}
    
	//http://localhost:8080/gcm/register?deviceGcmId=1


}
