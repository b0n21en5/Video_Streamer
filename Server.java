import java.awt.Color;

import javax.swing.JFrame;

class Server extends JFrame{

    Server(){
        setLayout(null);
        setSize(450, 700);
        getContentPane().setBackground(Color.GRAY);
        setLocation(200, 50);
        setVisible(true);
    }

    public static void main(String[] args) {
        
        new Server();
    }
}