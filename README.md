for PXT/microbit

# SSD1306 OLED PXT Package

This is the PXT Package for SSD1306 OLED controller, based on the Adafruit Arduino library available [here](https://github.com/adafruit/Adafruit_SSD1306).

## Hardware Setup
1. Insert the OLED display into the I2C ports on the break out board.

## PXT Blocks
### Initialize OLED Display
Initialize OLED display with height and width of the OLED display (Eg: 64 by 128).
Shows TinkerTanker splash screen after initializing.

### Initialize OLED Display for 'Text Output'
Initialize OLED display.
Clears the screen and sets the cursor to (0, 0) to print text inputs.
Able to use 'show string' and 'show number' below.
In text output mode, wrapping is enabled.
If text exceeds number of lines supported, the lines will 'shift up', like in terminal.

### Show String
Prints string to OLED, at cursor location.
Requires OLED to be initialized for text display.

### Show Number
Prints number to OLED, at cursor location.
Requires OLED to be initialized for text display.


## Possible Extensions
1. Plot Graph
2. Analog Clock
3. Analog Meter
4. Variable tracking?
6. Print images

## Footnotes
1.  Datasheet
https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf