package com.example.victor.testegcm;

import android.content.Intent;

/**
 * Created by Victor on 29/10/2015.
 */
public interface IGcmMessageListener {
    void newMessage (Intent intent);
}
