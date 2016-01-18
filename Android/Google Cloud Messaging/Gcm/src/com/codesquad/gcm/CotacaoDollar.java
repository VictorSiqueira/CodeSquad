package com.codesquad.gcm;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.Sender;

/**
 * Componente criado para ser acessado diretamente pelo browser,
 * e disparar para cada device, o novo valor da cotação do dollar
 */
@WebServlet("/cotacaodollar")
public class CotacaoDollar extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<String> devices = (List<String>)request.getServletContext().getAttribute(Constants.GCM_IDS);
		if (devices==null) {
			return;
		}
		//
		String valor = request.getParameter("valor");
		if (valor==null) {
			return;
		}
		notificarDevices(devices, valor);
	}

	private void notificarDevices(List<String> devices, String cotacaoDollar) {
		Sender sender = new Sender(Constants.API_KEY);
		Message message = new Message.Builder()
			.collapseKey("1")
			.timeToLive(60)
			.delayWhileIdle(true)
			.addData("cotacaoDollar", cotacaoDollar)
			.build();
		try {
			sender.send(message, devices, 1);
//			results.getResults().get(0).getMessageId();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//http://localhost:8080/gcm/cotacaodollar?valor=1

}
