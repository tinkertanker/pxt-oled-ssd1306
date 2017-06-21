#include "pxt.h"
#include "Adafruit_SSD1306.h"
using namespace pxt;

namespace OLED {
	#define SSD1306_ADDRESS 0x78
	#undef printf
	
	MicroBitI2C i2c(I2C_SDA0, I2C_SCL0);
	Adafruit_SSD1306_I2c *oled;

	void init(int height, int width){
		if (oled != NULL) delete oled;
		oled = new Adafruit_SSD1306_I2c(i2c, SSD1306_ADDRESS, height, width);
		oled->splash();
		oled->display();
	}
	
	//%
	void init_terminal(int height, int width){
		if (oled != NULL) delete oled;
		oled = new Adafruit_SSD1306_I2c(i2c, SSD1306_ADDRESS, height, width);
		oled->clearDisplay();
		oled->display();
		oled->setTextCursor(0, 0);
	}
	
	//%
    void showString(StringData *text) {
		oled->printf("%s\n", text->data);
		oled->display();
    }
    
    //%
    void showNumber (int number) {
		oled->printf("%d\n", number);
		oled->display();
	}

	//%
	void clearDisplay(){
		oled->clearDisplay();
		oled->display();
	}

	//%
	void drawCircle(int x, int y, int r){
		oled->drawCircle(x, y, r, 0xFFFF);
	}

	//%
	void fillCircle(int x, int y, int r){
		oled->fillCircle(x, y, r, 0xFFFF);
	}

	//%
	void drawLine(int x0, int y0, int x1, int y1){
		oled->drawLine(x0, y0, x1, y1, 0xFFFF);
	}

	//%
	void fillRect(int x, int y, int w, int h){
		oled->fillRect(x, y, w, h, 0xFFFF);
	}

	//%
    void drawRect(int x, int y, int w, int h){
    	oled->drawRect(x, y, w, h, 0xFFFF);
    }

    //%
	void fillRoundRect(int x, int y, int w, int h, int r){
		oled->fillRoundRect(x, y, w, h, r, 0xFFFF);
	}

	//%
    void drawRoundRect(int x, int y, int w, int h, int r){
    	oled->drawRoundRect(x, y, w, h, r, 0xFFFF);
    }

    //%
    void drawTriangle(int x0, int y0, int x1, int y1, int x2, int y2){
    	oled->drawTriangle(x0, y0, x1, y1, x2, y2, 0xFFFF);
    }

    //%
    void fillTriangle(int x0, int y0, int x1, int y1, int x2, int y2){
    	oled->fillTriangle(x0, y0, x1, y1, x2, y2, 0xFFFF);
    }

    #define printf(...) uBit.serial.printf(__VA_ARGS__)

}
