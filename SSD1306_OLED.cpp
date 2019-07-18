#include "pxt.h"
#include "Adafruit_SSD1306.h"

using namespace pxt;

namespace OLED {
	#define SSD1306_ADDRESS 0x78
	#undef printf

	// maintain compatibility with pre-unicode versions of microbit
	#ifndef PXT_STRING_DATA
	#define PXT_STRING_DATA(str) str->getUTF8Data()
	#endif

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
    void showStringNoNewLine(String text) {
		oled->printf("%s", PXT_STRING_DATA(text));
		oled->display();
    }

	//%
    void showStringWithNewLine(String text) {
		oled->printf("%s\n", PXT_STRING_DATA(text));
		oled->display();
    }
	
    //%
    void showNumberWithoutNewLine (int number) {
		oled->printf("%d", number);
		oled->display();
	}
	
	//%
    void showNumberWithNewLine (int number) {
		oled->printf("%d\n", number);
		oled->display();
	}
	
    //%
    void NextLine () {
		oled->printf("\n");
		oled->display();
	}

	//%
	void clearDisplay(){
		oled->setTextCursor(0, 0);
		oled->clearDisplay();
		oled->display();
	}

    #define printf(...) uBit.serial.printf(__VA_ARGS__)

}
