package com.example.victor.testegcm;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.AsyncTask;

import com.google.android.gms.gcm.GoogleCloudMessaging;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Victor on 01/11/2015.
 */
public class GcmRegisterUtil {
    private Context context;
    private GoogleCloudMessaging gcm;

    private static final String PROPERTY_GCM_ID = "gcmId";
    private static final String PROPERTY_APP_VERSION = "appVersion";

    public  GcmRegisterUtil (Context context){
        this.context = context;
        gcm = GoogleCloudMessaging.getInstance(context);
    }

    public void checkRegistrationId(){
        String regId = getGcmId();
        if (regId == null) {
            registerInBackground();
        }
    }

    @SuppressWarnings({"unchecked","rawtypes"})
    public void registerInBackground(){
        new AsyncTask(){

            @Override
            protected Object doInBackground(Object[] params) {
                String registrationId = null;
                try {
                    registrationId = gcm.register(context.getString(R.string.project_id));
                    sendGcmIdToServer(registrationId);
                    storeGcmId(registrationId);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }

            
        }.execute(null,null,null);
    }

    private void sendGcmIdToServer(String registrationId) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append(context.getString(R.string.server_url))
          .append("?deviceGcm")
          .append(registrationId);
        URL url = new URL(sb.toString());
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setDoInput(true);
        connection.setDoOutput(false);
        connection.connect();
        connection.getInputStream().read();
        connection.disconnect();
    }


    private void storeGcmId(String registrationId) {
        SharedPreferences preferences = context.getSharedPreferences(GcmRegisterUtil.class.getSimpleName(),Context.MODE_PRIVATE);
        int appVersion = getAppVersion();
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(PROPERTY_GCM_ID,registrationId);
        editor.putInt(PROPERTY_APP_VERSION,appVersion);
        editor.commit();
    }

    private String getGcmId() {
        SharedPreferences prefs = context.getSharedPreferences(GcmRegisterUtil.class.getSimpleName(), Context.MODE_PRIVATE);
        String registrationId = prefs.getString(PROPERTY_GCM_ID, "");
        if ("".equals(registrationId)){
            return null;
        }

        int regiteredVersion = prefs.getInt(PROPERTY_APP_VERSION,0);
        int currentVersion = getAppVersion();
        if(regiteredVersion != currentVersion){
            return null;
        }
        return registrationId;
    }

    private int getAppVersion(){
        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(),0);
            return packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            throw new RuntimeException("Não foi possivel recuperar o package name"+e.getMessage());
        }

    }
}
