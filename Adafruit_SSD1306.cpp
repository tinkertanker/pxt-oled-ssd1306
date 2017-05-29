/*********************************************************************
This is a library for our Monochrome OLEDs based on SSD1306 drivers

  Pick one up today in the adafruit shop!
  ------> http://www.adafruit.com/category/63_98

These displays use SPI to communicate, 4 or 5 pins are required to  
interface

Adafruit invests time and resources providing this open source code, 
please support Adafruit and open-source hardware by purchasing 
products from Adafruit!

Written by Limor Fried/Ladyada  for Adafruit Industries.  
BSD license, check license.txt for more information
All text above, and the splash screen below must be included in any redistribution
*********************************************************************/

/*
 *  Modified by Neal Horman 7/14/2012 for use in mbed
 */

#include "mbed.h"
#include "Adafruit_SSD1306.h"

#define SSD1306_SETCONTRAST 0x81
#define SSD1306_DISPLAYALLON_RESUME 0xA4
#define SSD1306_DISPLAYALLON 0xA5
#define SSD1306_NORMALDISPLAY 0xA6
#define SSD1306_INVERTDISPLAY 0xA7
#define SSD1306_DISPLAYOFF 0xAE
#define SSD1306_DISPLAYON 0xAF
#define SSD1306_SETDISPLAYOFFSET 0xD3
#define SSD1306_SETCOMPINS 0xDA
#define SSD1306_SETVCOMDETECT 0xDB
#define SSD1306_SETDISPLAYCLOCKDIV 0xD5
#define SSD1306_SETPRECHARGE 0xD9
#define SSD1306_SETMULTIPLEX 0xA8
#define SSD1306_SETLOWCOLUMN 0x00
#define SSD1306_SETHIGHCOLUMN 0x10
#define SSD1306_SETSTARTLINE 0x40
#define SSD1306_MEMORYMODE 0x20
#define SSD1306_COMSCANINC 0xC0
#define SSD1306_COMSCANDEC 0xC8
#define SSD1306_SEGREMAP 0xA0
#define SSD1306_CHARGEPUMP 0x8D

void Adafruit_SSD1306::begin(uint8_t vccstate)
{
    // turn on VCC (9V?)

    command(SSD1306_DISPLAYOFF);
    command(SSD1306_SETDISPLAYCLOCKDIV);
    command(0x80);                                  // the suggested ratio 0x80

    command(SSD1306_SETMULTIPLEX);
    command(_rawHeight-1);

    command(SSD1306_SETDISPLAYOFFSET);
    command(0x0);                                   // no offset

    command(SSD1306_SETSTARTLINE | 0x0);            // line #0

    command(SSD1306_CHARGEPUMP);
    command((vccstate == SSD1306_EXTERNALVCC) ? 0x10 : 0x14);

    command(SSD1306_MEMORYMODE);
    command(0x00);                                  // 0x0 act like ks0108

    command(SSD1306_SEGREMAP | 0x1);

    command(SSD1306_COMSCANDEC);

    command(SSD1306_SETCOMPINS);
    command(_rawHeight == 32 ? 0x02 : 0x12);        // TODO - calculate based on _rawHieght ?

    command(SSD1306_SETCONTRAST);
    command(_rawHeight == 32 ? 0x8F : ((vccstate == SSD1306_EXTERNALVCC) ? 0x9F : 0xCF) );

    command(SSD1306_SETPRECHARGE);
    command((vccstate == SSD1306_EXTERNALVCC) ? 0x22 : 0xF1);

    command(SSD1306_SETVCOMDETECT);
    command(0x40);

    command(SSD1306_DISPLAYALLON_RESUME);

    command(SSD1306_NORMALDISPLAY);
    
    command(SSD1306_DISPLAYON);
}

// Set a single pixel
void Adafruit_SSD1306::drawPixel(int16_t x, int16_t y, uint16_t color)
{
    if ((x < 0) || (x >= width()) || (y < 0) || (y >= height()))
        return;
    
    // check rotation, move pixel around if necessary
    switch (getRotation())
    {
        case 1:
            swap(x, y);
            x = _rawWidth - x - 1;
            break;
        case 2:
            x = _rawWidth - x - 1;
            y = _rawHeight - y - 1;
            break;
        case 3:
            swap(x, y);
            y = _rawHeight - y - 1;
            break;
    }  
    
    // x is which column
    if (color == WHITE) 
        buffer[x+ (y>>3)*_rawWidth] |= _BV((y&7));  
    else // else black
        buffer[x+ (y>>3)*_rawWidth] &= ~_BV((y&7)); 
}
void Adafruit_SSD1306::transposePosition (int16_t &x, int16_t &y) {
	switch (getRotation())
    {
        case 1:
            swap(x, y);
            x = _rawWidth - x - 1;
            break;
        case 2:
            x = _rawWidth - x - 1;
            y = _rawHeight - y - 1;
            break;
        case 3:
            swap(x, y);
            y = _rawHeight - y - 1;
            break;
    }
}
void Adafruit_SSD1306::invertDisplay(bool i)
{
	command(i ? SSD1306_INVERTDISPLAY : SSD1306_NORMALDISPLAY);
}

// Send the display buffer out to the display
void Adafruit_SSD1306::display(void)
{
	command(SSD1306_SETLOWCOLUMN | 0x0);  // low col = 0
	command(SSD1306_SETHIGHCOLUMN | 0x0);  // hi col = 0
	command(SSD1306_SETSTARTLINE | 0x0); // line #0
	sendDisplayBuffer();
}

// Clear the display buffer. Requires a display() call at some point afterwards
void Adafruit_SSD1306::clearDisplay(void)
{
	std::fill(buffer.begin(),buffer.end(),0);
}

//Shift the display buffer by (dx, dy)
void Adafruit_SSD1306::shiftDisplay(int16_t dx, int16_t dy) {
	if (dx <= 0) {
		for (int16_t x = 0; x < _width; ++x) {
			if (dy <= 0) {
				for (int16_t y = 0; y < _height; ++y) {
					int16_t cx = x, cy = y, nx = x - dx, ny = y - dy;
					transposePosition(cx, cy);
					transposePosition(nx, ny);
					if (nx < 0 || ny < 0 || nx >= _width || ny >= _height) buffer[cx + (cy>>3) * _rawWidth] &= 0xFF ^ (1<<(cy&7));
					else {
						/* swap bits cy % 8 and ny % 8 */
						if ( !!(buffer[cx + (cy>>3)*_rawWidth] & (1<<(cy&7))) !=
							 !!(buffer[nx + (ny>>3)*_rawWidth] & (1<<(ny&7))) ){
							buffer[cx + (cy>>3)* _rawWidth] ^= (1<<(cy&7));
							buffer[nx + (ny>>3)* _rawWidth] ^= (1<<(ny&7));
						}
					}
				}
			} else {
				for (int16_t y = _height-1; y >= 0; --y) {
					int16_t cx = x, cy = y, nx = x - dx, ny = y - dy;
					transposePosition(cx, cy);
					transposePosition(nx, ny);
					if (nx < 0 || ny < 0 || nx >= _width || ny >= _height) buffer[cx + (cy>>3) * _rawWidth] &= 0xFF ^ (1<<(cy&7));
					else {
						/* swap bits cy % 8 and ny % 8 */
						if ( !!(buffer[cx + (cy>>3)*_rawWidth] & (1<<(cy&7))) !=
							 !!(buffer[nx + (ny>>3)*_rawWidth] & (1<<(ny&7))) ){
							buffer[cx + (cy>>3)*_rawWidth] ^= (1<<(cy&7));
							buffer[nx + (ny>>3)* _rawWidth] ^= (1<<(ny&7));
						}					
					}
				}
			}
		}
	}
	else {
		for (int16_t x = _width-1; x >= 0; --x) {
			if (dy <= 0) {
				for (int16_t y = 0; y < _height; ++y) {
					int16_t cx = x, cy = y, nx = x - dx, ny = y - dy;
					transposePosition(cx, cy);
					transposePosition(nx, ny);
					if (nx < 0 || ny < 0 || nx >= _width || ny >= _height) buffer[cx + (cy>>3) * _rawWidth] &= 0xFF ^ (1<<(cy&7));
					else {
						/* swap bits cy % 8 and ny % 8 */
						if ( !!(buffer[cx + (cy>>3)*_rawWidth] & (1<<(cy&7))) !=
							 !!(buffer[nx + (ny>>3)*_rawWidth] & (1<<(ny&7))) ) {
							buffer[cx + (cy>>3)*_rawWidth] ^= (1<<(cy&7));
							buffer[nx + (ny>>3)* _rawWidth] ^= (1<<(ny&7));
						}					}
				}
			} else {
				for (int16_t y = _height-1; y >= 0; --y) {
					int16_t cx = x, cy = y, nx = x - dx, ny = y - dy;
					transposePosition(cx, cy);
					transposePosition(nx, ny);
					if (nx < 0 || ny < 0 || nx >= _width || ny >= _height) buffer[cx + (cy>>3) * _rawWidth] &= 0xFF ^ (1<<(cy&7));
					else {
						/* swap bits cy % 8 and ny % 8 */
						if ( !!(buffer[cx + (cy>>3)*_rawWidth] & (1<<(cy&7))) !=
							 !(!buffer[nx + (ny>>3)*_rawWidth] & (1<<(ny&7))) ){
							buffer[cx + (cy>>3)*_rawWidth] ^= (1<<(cy&7));
							buffer[nx + (ny>>3)* _rawWidth] ^= (1<<(ny&7));
						}					}
				}
			}
		}
	}
}

void Adafruit_SSD1306::splash(void)
{
	/* Draws tinkertanker splash */
	
	/* Sets everything to white */
	std::fill(buffer.begin(),buffer.end(),255);
	
	int8_t l = 25;
	int8_t ih = 4;
	
	/* Draws the black logo, using some formula.. don' ask */
	for (int8_t y = ih; y < ih+48; ++y) {	//vertical
		if (y < ih+3) l++;
		else if (y >= ih+48-4 && y % 4 != 0) --l;
		else if (y % 4 == 0 && y < ih+48-4) ++l;
		for (int8_t x = 64-l; x <= 64+l; ++x) {	//horizontal
			drawPixel(x, y, BLACK);
		}
	}
	
	/* Draw left glasses */
	int8_t sy = ih+12, sx = 64-18, sz = 13;
	for (int8_t i = 0; i < sz; ++i) 
		for (int8_t j = 0; j < sz; ++j) 
			drawPixel(sx+i, sy+j, WHITE);

	/* Draw right glasses */
	sy = ih+12, sx = 64+18-12, sz = 13;
	for (int8_t i = 0; i < sz; ++i) 
		for (int8_t j = 0; j < sz; ++j) 
			drawPixel(sx+i, sy+j, WHITE);
		
	/* Draw the 'bridge' */
	sy = ih+12+1;
	for (int8_t i = 0; i < 5; ++i) 
		for (int8_t j = 64-16+10; j < 64+16-10; ++j) 
			drawPixel(j, sy+i, WHITE);
	
	/* Tinkercademy text */
	textcolor = BLACK;
	textbgcolor = WHITE;
	setTextCursor(64-36,64-10);
	this->printf("TINKERCADEMY");
	
	/* Reset to defaults */
	setTextCursor(0, 0);
	textcolor = WHITE;
	textbgcolor = BLACK;
}
