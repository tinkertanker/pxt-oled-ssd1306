// Documentation on defining PXT blocks:
// https://www.pxt.io/defining-blocks

#include "pxt.h"
#include "Adafruit_SSD1306.h"
using namespace pxt;

namespace SSD1306_OLED {
	#define SSD1306_ADDRESS 0x78
	
	MicroBitI2C i2c(I2C_SDA0, I2C_SCL0);
	Adafruit_SSD1306_I2c *oled;
	/**
	* initialises I2C OLED
	*/
	//% blockId=oled_init
	//% block="Initialize OLED height %height|width %width"
	//% icon="\uf1ec"
	void init(int height, int width){
		oled = new Adafruit_SSD1306_I2c(i2c, p10, SSD1306_ADDRESS, height, width);
	}
	
}
