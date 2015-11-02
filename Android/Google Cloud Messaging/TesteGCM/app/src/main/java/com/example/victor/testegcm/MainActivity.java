package com.example.victor.testegcm;

import android.app.Dialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telecom.Connection;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;

public class MainActivity extends AppCompatActivity {

    private static boolean running = false;
    private static IGcmMessageListener iGcmMessageListener;
    private EditText cotacaoDolar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        int status = GooglePlayServicesUtil.isGooglePlayServicesAvailable(getBaseContext());
        if ( status != ConnectionResult.SUCCESS){
            int requestCode = 10;
            Dialog dialog = GooglePlayServicesUtil.getErrorDialog(status, MainActivity.this, requestCode);
            dialog.show();
        }else {
            initComponents();
            new GcmRegisterUtil(getBaseContext()).checkRegistrationId();

            if (getIntent() != null){
                iGcmMessageListener.newMessage(getIntent());
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        running = true;
    }

    @Override
    protected void onStop() {
        super.onStop();
        running = false;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void initComponents(){
        cotacaoDolar = (EditText) findViewById(R.id.edtCotacaoDolar);
        iGcmMessageListener = new IGcmMessageListener() {
            @Override
            public void newMessage(Intent intent) {
                AtualizaCotacao ruCotacao = new AtualizaCotacao();
                ruCotacao.intent = intent;
                runOnUiThread(ruCotacao);
            }
        };
    }

    class AtualizaCotacao implements Runnable {
        Intent intent;
        @Override
        public void run() {
            String cotacao = intent.getStringExtra("cotacaoDolar");
            cotacaoDolar.setText(cotacao);
        }
    }

    public static boolean isRunning(){
        return running;
    }

    public static IGcmMessageListener getiGcmMessageListener () {
        return iGcmMessageListener;
    }
}
