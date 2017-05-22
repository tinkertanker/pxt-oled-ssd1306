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
		oled = new Adafruit_SSD1306_I2c(i2c, p10, SSD1306_ADDRESS, height, width);
		oled->splash();
		oled->display();
	}
	
	//%
	void init_terminal(int height, int width){
		if (oled != NULL) delete oled;
		oled = new Adafruit_SSD1306_I2c(i2c, p10, SSD1306_ADDRESS, height, width);
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
    
    #define printf(...) uBit.serial.printf(__VA_ARGS__)

}
