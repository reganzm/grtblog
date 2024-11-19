package com.grtsinry43.grtblog.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

/**
 * @author grtsinry43
 * @date 2024/11/19 17:08
 * @description 热爱可抵岁月漫长
 */
@Service
public class SocketIOService {
    private final SocketIOServer socketIOServer;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private ScheduledFuture<?> debounceFuture;

    @Autowired
    public SocketIOService(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    @PostConstruct
    public void startServer() {
        try {
            socketIOServer.start();
            System.out.println("Socket.IO server started");
        } catch (Exception e) {
            System.err.println("Failed to start Socket.IO server: " + e.getMessage());
        }
    }

    @OnConnect
    public void onConnect(SocketIOClient client) {
        debounceUpdateOnlineCount();
    }

    @OnDisconnect
    public void onDisconnect(SocketIOClient client) {
        debounceUpdateOnlineCount();
    }

    @OnEvent("chat")
    public void onChatEvent(SocketIOClient client, String message) {
        socketIOServer.getBroadcastOperations().sendEvent("chat", message);
    }

    @PreDestroy
    public void stopServer() {
        try {
            socketIOServer.stop();
            scheduler.shutdown();
            System.out.println("Socket.IO server stopped");
        } catch (Exception e) {
            System.err.println("Failed to stop Socket.IO server: " + e.getMessage());
        }
    }

    private void debounceUpdateOnlineCount() {
        if (debounceFuture != null && !debounceFuture.isDone()) {
            debounceFuture.cancel(false);
        }
        debounceFuture = scheduler.schedule(this::updateOnlineCount, 2000, TimeUnit.MILLISECONDS);
    }

    private void updateOnlineCount() {
        int clientCount = socketIOServer.getAllClients().size();
        socketIOServer.getBroadcastOperations().sendEvent("onlineCount", clientCount);
    }
}