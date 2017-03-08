// Documentation on defining PXT blocks:
// https://www.pxt.io/defining-blocks

#include "pxt.h"
#include "Adafruit_SSD1306.h"
using namespace pxt;

namespace SSD1306_OLED {
	#define SSD1306_ADDRESS 0x78
	#undef printf(...)
	
	
	MicroBitI2C i2c(I2C_SDA0, I2C_SCL0);
	Adafruit_SSD1306_I2c *oled;
	/**
	* initialises I2C OLED with Splash Display
	*/
	//% blockId=oled_init
	//% block="Initialize OLED height %height|width %width"
	//% icon="\uf1ec"
	void init(int height, int width){
		oled = new Adafruit_SSD1306_I2c(i2c, p10, SSD1306_ADDRESS, height, width);
	}
	
	/**
	* initialises I2C OLED for 'Terminal Mode'
	*/
	//% blockId=oled_init_terminal
	//% block="Initialize OLED text output height %height|width %width"
	//% icon="\uf1ec"
	void init_terminal(int height, int width){
		oled = new Adafruit_SSD1306_I2c(i2c, p10, SSD1306_ADDRESS, height, width);
		oled->clearDisplay();
		oled->display();
		oled->setTextCursor(0, 0);
	}
	
	/**
	* Prints a text on the OLED display, will wrap and scroll upwards
	*/
	//% help=basic/show-string 
    //% weight=87 blockGap=8
    //% block="show|string %text" 
    //% async
    //% blockId=oled_print_string
	//% icon="\uf1ec"
    void showString(StringData *text) {
		oled->printf("%s\n", text->data);
		oled->display();
    }
    
    
    /**
     * Print a number on the OLED display
     */
    //% help=basic/show-number
    //% weight=96
    //% blockId=oled_print_number
    //% block="show|number %number" blockGap=8
    //% async
    void showNumber (int number) {
		oled->printf("%d\n", number);
		oled->display();
	}
    
	#define printf(...) uBit.serial.printf(__VA_ARGS__)

}
